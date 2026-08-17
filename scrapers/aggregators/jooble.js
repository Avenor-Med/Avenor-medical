// scrapers/aggregators/jooble.js
// Ingest US healthcare jobs from Jooble aggregator.
// Docs: https://jooble.org/api/about
import 'dotenv/config';
import { upsertJobs, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'jooble';
const KEYWORDS = [
  'registered nurse', 'nurse practitioner', 'physician assistant',
  'physician', 'CRNA', 'ICU nurse', 'ER nurse', 'hospitalist',
  'cardiologist', 'family medicine', 'anesthesiologist'
];

const MAX_PAGES = parseInt(process.env.INGEST_MAX_PAGES || '5');

async function search(keyword, page = 1) {
  const res = await fetch(`https://jooble.org/api/${process.env.JOOBLE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keywords: keyword, location: 'United States', page })
  });
  if (!res.ok) throw new Error(`Jooble HTTP ${res.status}`);
  return await res.json();
}

function extractCityState(loc) {
  if (!loc) return { city: null, state: null };
  const m = loc.match(/([A-Za-z\.\s]+),\s*([A-Z]{2})/);
  if (m) return { city: m[1].trim(), state: m[2] };
  return { city: loc, state: null };
}

function transform(j) {
  const { city, state } = extractCityState(j.location);
  return {
    source_id: String(j.id ?? j.link),
    facility_id: null,
    title: j.title,
    profession: inferProfession(j.title, j.snippet ?? ''),
    specialty: inferSpecialty(j.title, j.snippet ?? ''),
    city,
    state,
    shift_type: null,
    hours_per_week: null,
    duration_weeks: null,
    rate_usd: null,
    job_type: j.type ?? 'Permanent',
    visa_support: false,
    signing_bonus_usd: null,
    requirements: null,
    description: (j.snippet ?? '').slice(0, 4000),
    status: 'OPEN',
    posted_at: j.updated ?? null,
    expires_at: null
  };
}

export async function ingest() {
  if (!process.env.JOOBLE_API_KEY) throw new Error('JOOBLE_API_KEY required');

  let allJobs = [];
  for (const kw of KEYWORDS) {
    for (let page = 1; page <= MAX_PAGES; page++) {
      try {
        log(SOURCE, `search ${kw} p${page}`);
        const data = await search(kw, page);
        const jobs = (data.jobs ?? []).map(transform).filter(j => j.title);
        allJobs.push(...jobs);
        if (jobs.length < 20) break;
        await new Promise(r => setTimeout(r, 400));
      } catch (e) { logError(SOURCE, e); break; }
    }
  }

  const deduped = dedupe(allJobs);
  const normalized = deduped.map(j => normalize(j, SOURCE));
  const { inserted } = await upsertJobs(normalized);
  await logRun(SOURCE, allJobs.length, inserted);
  log(SOURCE, 'done', { seen: allJobs.length, upserted: inserted });
  return { source: SOURCE, seen: allJobs.length, upserted: inserted };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  ingest().catch(err => { logError(SOURCE, err); process.exit(1); });
}
