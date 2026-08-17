// scrapers/aggregators/themuse.js
// Ingest US healthcare jobs from The Muse public API.
// Docs: https://www.themuse.com/developers/api/v2
import 'dotenv/config';
import { upsertJobs, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'themuse';
const BASE = 'https://www.themuse.com/api/public/jobs';
const MAX_PAGES = parseInt(process.env.INGEST_MAX_PAGES || '20');

async function fetchPage(page) {
  const url = new URL(BASE);
  url.searchParams.set('category', 'Healthcare');
  url.searchParams.set('location', 'United States');
  url.searchParams.set('page', String(page));

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Muse HTTP ${res.status}`);
  return await res.json();
}

function transform(j) {
  const loc = j.locations?.[0]?.name ?? '';
  const [city, state] = loc.split(',').map(s => s.trim());

  return {
    source_id: String(j.id),
    facility_id: null,
    title: j.name,
    profession: inferProfession(j.name, j.contents ?? ''),
    specialty: inferSpecialty(j.name, j.contents ?? ''),
    city: city || null,
    state: (state ?? '').slice(0, 2).toUpperCase() || null,
    shift_type: null,
    hours_per_week: null,
    duration_weeks: null,
    rate_usd: null,
    job_type: j.type ?? 'Permanent',
    visa_support: false,
    signing_bonus_usd: null,
    requirements: null,
    description: (j.contents ?? '').replace(/<[^>]+>/g, '').slice(0, 4000),
    status: 'OPEN',
    posted_at: j.publication_date ?? null,
    expires_at: null
  };
}

export async function ingest() {
  let allJobs = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    try {
      log(SOURCE, `page ${page}`);
      const data = await fetchPage(page);
      const jobs = (data.results ?? []).map(transform).filter(j => j.title);
      allJobs.push(...jobs);
      if (jobs.length < 20) break;
      await new Promise(r => setTimeout(r, 300));
    } catch (e) { logError(SOURCE, e); break; }
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
