// scrapers/hospitals/hca.js
// Scrape HCA Healthcare career pages (Workday-based).
// HCA runs the largest US hospital network — 185+ facilities.
import 'dotenv/config';
import { chromium } from 'playwright';
import { upsertJobs, upsertFacility, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'hca';
const BASE = 'https://careers.hcahealthcare.com';

// Job families we care about
const KEYWORDS = ['Registered Nurse', 'Physician', 'Physician Assistant', 'CRNA', 'Nurse Practitioner'];

async function scrapeKeyword(page, keyword) {
  const url = `${BASE}/search-jobs/${encodeURIComponent(keyword)}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('.job-list', { timeout: 20000 }).catch(() => {});

  const jobs = await page.$$eval('.job-list li', els =>
    els.map(el => ({
      title: el.querySelector('.job-title')?.textContent?.trim(),
      location: el.querySelector('.job-location')?.textContent?.trim(),
      link: el.querySelector('a')?.href,
      req_id: el.querySelector('a')?.href?.match(/\/job\/([^\/\?]+)/)?.[1] || null
    })).filter(j => j.title)
  );
  return jobs;
}

function extractCityState(location) {
  if (!location) return { city: null, state: null };
  const m = location.match(/([\w\s\.]+),\s*([A-Z]{2})/);
  if (m) return { city: m[1].trim(), state: m[2] };
  return { city: location, state: null };
}

async function fetchDescription(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const desc = await page.$eval('.job-description', el => el.textContent.trim()).catch(() => '');
    return desc.slice(0, 4000);
  } catch { return ''; }
}

export async function ingest() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 AvenorMedical Job Ingestion Bot; contact@avenormedical.com'
  });
  const page = await context.newPage();

  let allJobs = [];
  try {
    for (const kw of KEYWORDS) {
      log(SOURCE, `keyword: ${kw}`);
      try {
        const items = await scrapeKeyword(page, kw);
        log(SOURCE, `${kw}: ${items.length} raw`);

        for (const item of items) {
          const { city, state } = extractCityState(item.location);
          const facilityId = `hca-${(city ?? 'unknown').toLowerCase().replace(/\W/g, '-')}`;

          // Upsert facility (city as facility for HCA — refine later)
          await upsertFacility({
            source_id: facilityId,
            name: `HCA ${city ?? 'Facility'}`,
            city, state,
            type: 'Hospital',
            ats_source: 'workday'
          });

          allJobs.push({
            source_id: item.req_id ?? item.link,
            facility_id: facilityId,
            title: item.title,
            profession: inferProfession(item.title),
            specialty: inferSpecialty(item.title),
            city, state,
            shift_type: null,
            hours_per_week: null,
            duration_weeks: null,
            rate_usd: null,
            job_type: 'Permanent',
            visa_support: false,
            signing_bonus_usd: null,
            requirements: null,
            description: `${item.title} at HCA ${city ?? ''}`,
            status: 'OPEN',
            posted_at: null,
            expires_at: null
          });
        }
        await new Promise(r => setTimeout(r, 1500));
      } catch (e) { logError(SOURCE, e); }
    }
  } finally {
    await browser.close();
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
