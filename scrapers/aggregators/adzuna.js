// scrapers/aggregators/adzuna.js
// Ingest US healthcare jobs from Adzuna's aggregate API.
// Docs: https://developer.adzuna.com/docs/search
import 'dotenv/config';
import { upsertJobs, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'adzuna';
const BASE = 'https://api.adzuna.com/v1/api/jobs/us/search';

const CATEGORY = 'healthcare-nursing-jobs';
const RESULTS_PER_PAGE = 50;
const MAX_PAGES = parseInt(process.env.INGEST_MAX_PAGES || '20');

async function fetchPage(page) {
  const url = new URL(`${BASE}/${page}`);
  url.searchParams.set('app_id', process.env.ADZUNA_APP_ID);
  url.searchParams.set('app_key', process.env.ADZUNA_APP_KEY);
  url.searchParams.set('results_per_page', String(RESULTS_PER_PAGE));
  url.searchParams.set('category', CATEGORY);
  url.searchParams.set('content-type', 'application/json');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Adzuna HTTP ${res.status}: ${await res.text()}`);
  return await res.json();
}

// Adzuna's US state codes are embedded in location.area
function extractState(area) {
  if (!area || !Array.isArray(area)) return null;
  // area is like ["US", "Texas", "Dallas"]
  const state = area[1];
  const map = {
    Alabama:'AL', Alaska:'AK', Arizona:'AZ', Arkansas:'AR', California:'CA', Colorado:'CO',
    Connecticut:'CT', Delaware:'DE', Florida:'FL', Georgia:'GA', Hawaii:'HI', Idaho:'ID',
    Illinois:'IL', Indiana:'IN', Iowa:'IA', Kansas:'KS', Kentucky:'KY', Louisiana:'LA',
    Maine:'ME', Maryland:'MD', Massachusetts:'MA', Michigan:'MI', Minnesota:'MN',
    Mississippi:'MS', Missouri:'MO', Montana:'MT', Nebraska:'NE', Nevada:'NV',
    'New Hampshire':'NH', 'New Jersey':'NJ', 'New Mexico':'NM', 'New York':'NY',
    'North Carolina':'NC', 'North Dakota':'ND', Ohio:'OH', Oklahoma:'OK', Oregon:'OR',
    Pennsylvania:'PA', 'Rhode Island':'RI', 'South Carolina':'SC', 'South Dakota':'SD',
    Tennessee:'TN', Texas:'TX', Utah:'UT', Vermont:'VT', Virginia:'VA', Washington:'WA',
    'West Virginia':'WV', Wisconsin:'WI', Wyoming:'WY', 'District of Columbia':'DC'
  };
  return map[state] || null;
}

function transform(j) {
  const salary = j.salary_min ?? j.salary_max ?? null;
  return {
    source_id: String(j.id),
    facility_id: null,
    title: j.title,
    profession: inferProfession(j.title, j.description ?? ''),
    specialty: inferSpecialty(j.title, j.description ?? ''),
    city: j.location?.area?.[2] ?? null,
    state: extractState(j.location?.area),
    shift_type: null,
    hours_per_week: null,
    duration_weeks: null,
    rate_usd: salary ? Math.round(salary / 2080) : null,
    job_type: j.contract_time === 'part_time' ? 'Per Diem' : 'Permanent',
    visa_support: false,
    signing_bonus_usd: null,
    requirements: null,
    description: (j.description ?? '').slice(0, 4000),
    status: 'OPEN',
    posted_at: j.created ?? null,
    expires_at: null
  };
}

export async function ingest() {
  if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
    throw new Error('ADZUNA_APP_ID and ADZUNA_APP_KEY required');
  }

  let allJobs = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      log(SOURCE, `fetching page ${page}`);
      const data = await fetchPage(page);
      const jobs = (data.results ?? []).map(transform).filter(j => j.title);
      allJobs.push(...jobs);
      if (jobs.length < RESULTS_PER_PAGE) break;
      await new Promise(r => setTimeout(r, 250));  // stay under rate limit
    } catch (e) {
      logError(SOURCE, e);
      break;
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
