// scrapers/hospitals/_template.js
// COPY THIS FILE for each new hospital system. Rename to e.g. `kaiser.js`.
//
// STEPS to adapt for a new system:
//   1. Change SOURCE, BASE, and the actual URL structure
//   2. Update the CSS selectors below (open the careers page in DevTools to find them)
//   3. Adjust extractCityState() if the location format is unusual
//   4. Test locally: `node hospitals/YOURFILE.js`
//   5. Add it to ingest.js
//
// Hospital systems with ready-to-adapt templates:
//   - Ascension: https://careers.ascension.org  (Workday)
//   - CommonSpirit: https://commonspirit.taleo.net  (Taleo)
//   - Kaiser Permanente: https://jobs.kaiserpermanentejobs.org  (custom)
//   - Cleveland Clinic: https://jobs.clevelandclinic.org  (custom)
//   - Tenet: https://jobs.tenethealth.com  (iCIMS)
//   - Providence: https://www.providenceiscalling.jobs  (custom)
//   - Baylor Scott & White: https://careers.bswhealth.com  (iCIMS)
//   - Memorial Hermann: https://careers.memorialhermann.org  (Workday)
//   - Texas Health Resources: https://jobs.texashealth.org  (custom)
//   - UT Southwestern: https://jobs.utsouthwestern.edu  (Taleo)
//   - MD Anderson: https://jobs.mdanderson.org  (Taleo)
//   - NYU Langone: https://jobs.nyulangone.org  (Workday)
//   - Mass General Brigham: https://massgeneralbrigham.wd1.myworkdayjobs.com  (Workday)
//   - Houston Methodist: https://houstonmethodistcareers.org  (custom)
//   - Emory Healthcare: https://careers.emoryhealthcare.org  (Workday)
//
// Workday-based systems (marked above) all follow the same URL pattern:
//   https://{tenant}.wd1.myworkdayjobs.com/en-US/External/jobs
// so a single Workday scraper can handle multiple systems by parameter.

import 'dotenv/config';
import { chromium } from 'playwright';
import { upsertJobs, upsertFacility, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'REPLACE_ME';           // e.g. 'kaiser'
const BASE = 'https://REPLACE_ME';     // e.g. 'https://jobs.kaiserpermanentejobs.org'
const KEYWORDS = ['Nurse', 'Physician', 'Physician Assistant', 'CRNA', 'Nurse Practitioner'];

async function scrapeKeyword(page, keyword) {
  const url = `${BASE}/search?q=${encodeURIComponent(keyword)}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

  // TODO: update these selectors after inspecting the actual page
  const jobs = await page.$$eval('.job-item, .search-result', els =>
    els.map(el => ({
      title: el.querySelector('.title, h3, h4')?.textContent?.trim(),
      location: el.querySelector('.location')?.textContent?.trim(),
      link: el.querySelector('a')?.href,
      req_id: el.getAttribute('data-jobid') || el.querySelector('a')?.href?.match(/\/([\w\-]+)$/)?.[1]
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
        for (const item of items) {
          const { city, state } = extractCityState(item.location);
          const facilityId = `${SOURCE}-${(city ?? 'unknown').toLowerCase().replace(/\W/g, '-')}`;

          await upsertFacility({
            source_id: facilityId,
            name: `${SOURCE} ${city ?? 'Facility'}`,
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
            description: `${item.title} at ${SOURCE.toUpperCase()} ${city ?? ''}`,
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
