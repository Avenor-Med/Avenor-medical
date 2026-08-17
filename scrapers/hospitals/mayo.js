// scrapers/hospitals/mayo.js
// Scrape Mayo Clinic careers (jobs.mayoclinic.org)
import 'dotenv/config';
import { chromium } from 'playwright';
import { upsertJobs, upsertFacility, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'mayo';
const BASE = 'https://jobs.mayoclinic.org/jobs';

const CATEGORIES = [
  { path: '/nursing', label: 'Nursing' },
  { path: '/allied-health', label: 'Allied Health' },
  { path: '/physicians-scientists', label: 'Physicians' },
  { path: '/advanced-practice-providers', label: 'APP' }
];

async function scrapeCategory(page, cat) {
  const url = `${BASE}${cat.path}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('.job-listing, .job-tile, .search-result', { timeout: 20000 }).catch(() => {});

  const jobs = await page.$$eval('.job-listing, .job-tile, .search-result', els =>
    els.map(el => ({
      title: el.querySelector('.job-title, h3, h4, a')?.textContent?.trim(),
      location: el.querySelector('.location, .job-location')?.textContent?.trim(),
      link: el.querySelector('a')?.href,
      req_id: el.getAttribute('data-jobid') || el.querySelector('a')?.href?.match(/\/([\w\-]+)$/)?.[1]
    })).filter(j => j.title)
  );
  return jobs;
}

function extractCityState(location) {
  if (!location) return { city: null, state: null };
  const map = { Minnesota: 'MN', Arizona: 'AZ', Florida: 'FL', Wisconsin: 'WI' };
  const parts = location.split(',').map(s => s.trim());
  const state = map[parts[1]] || parts[1]?.slice(0, 2)?.toUpperCase() || null;
  return { city: parts[0], state };
}

export async function ingest() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let allJobs = [];
  try {
    for (const cat of CATEGORIES) {
      log(SOURCE, `category: ${cat.label}`);
      try {
        const items = await scrapeCategory(page, cat);
        log(SOURCE, `${cat.label}: ${items.length}`);
        for (const item of items) {
          const { city, state } = extractCityState(item.location);
          const facilityId = `mayo-${(city ?? 'unknown').toLowerCase().replace(/\W/g, '-')}`;
          await upsertFacility({
            source_id: facilityId,
            name: `Mayo Clinic ${city ?? ''}`.trim(),
            city, state, type: 'Hospital', ats_source: 'custom'
          });
          allJobs.push({
            source_id: item.req_id ?? item.link,
            facility_id: facilityId,
            title: item.title,
            profession: inferProfession(item.title),
            specialty: inferSpecialty(item.title),
            city, state,
            shift_type: null, hours_per_week: null, duration_weeks: null,
            rate_usd: null, job_type: 'Permanent', visa_support: false,
            signing_bonus_usd: null, requirements: null,
            description: `${item.title} at Mayo Clinic ${city ?? ''}`,
            status: 'OPEN', posted_at: null, expires_at: null
          });
        }
        await new Promise(r => setTimeout(r, 1500));
      } catch (e) { logError(SOURCE, e); }
    }
  } finally { await browser.close(); }

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
