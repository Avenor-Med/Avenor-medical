// scrapers/aggregators/usajobs.js
// Ingest VA hospital + military healthcare jobs from data.usajobs.gov
// Docs: https://developer.usajobs.gov/api-reference/get-api-search
import 'dotenv/config';
import { upsertJobs, upsertFacility, logRun } from '../shared/db.js';
import { normalize, inferSpecialty, inferProfession, dedupe } from '../shared/normalize.js';
import { log, logError } from '../shared/logger.js';

const SOURCE = 'usajobs';
const BASE = 'https://data.usajobs.gov/api/search';

// Healthcare-relevant Job Category Codes (from USAJobs)
const HEALTHCARE_CATEGORIES = [
  '0602',  // Medical Officer (Physician)
  '0603',  // Physician Assistant
  '0610',  // Nurse
  '0620',  // Practical Nurse (LPN)
  '0621',  // Nursing Assistant
  '0630',  // Dietitian
  '0631',  // Occupational Therapist
  '0633',  // Physical Therapist
  '0644',  // Medical Technologist
  '0647',  // Diagnostic Radiologic Technologist
  '0660',  // Pharmacist
  '0680',  // Dental Officer
  '0690',  // Industrial Hygiene
  '0801',  // Health Aid & Technician
];

async function fetchPage(category, page = 1) {
  const url = new URL(BASE);
  url.searchParams.set('JobCategoryCode', category);
  url.searchParams.set('ResultsPerPage', '250');
  url.searchParams.set('Page', String(page));

  const headers = {
    'Host': 'data.usajobs.gov',
    'User-Agent': process.env.USAJOBS_EMAIL || 'contact@avenormedical.com'
  };
  if (process.env.USAJOBS_AUTH_KEY) {
    headers['Authorization-Key'] = process.env.USAJOBS_AUTH_KEY;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`USAJobs HTTP ${res.status}`);
  return await res.json();
}

function transformPosting(p) {
  const desc = p.MatchedObjectDescriptor;
  if (!desc) return null;

  const loc = desc.PositionLocation?.[0];
  const salary = desc.PositionRemuneration?.[0];
  const org = desc.OrganizationName ?? desc.DepartmentName ?? 'U.S. Government';

  return {
    source_id: desc.PositionID,
    facility_id: null,
    title: desc.PositionTitle,
    profession: inferProfession(desc.PositionTitle, desc.QualificationSummary ?? ''),
    specialty: inferSpecialty(desc.PositionTitle, desc.QualificationSummary ?? ''),
    city: loc?.CityName ?? null,
    state: loc?.CountrySubDivisionCode?.slice(0, 2) ?? null,
    shift_type: null,
    hours_per_week: null,
    duration_weeks: null,
    rate_usd: salary?.MinimumRange ? parseFloat(salary.MinimumRange) / 2080 : null,
    job_type: 'Permanent',
    visa_support: false,
    signing_bonus_usd: null,
    requirements: (desc.QualificationSummary ?? '').slice(0, 2000),
    description: `${org} — ${desc.UserArea?.Details?.JobSummary ?? ''}`.slice(0, 4000),
    status: 'OPEN',
    posted_at: desc.PublicationStartDate,
    expires_at: desc.ApplicationCloseDate
  };
}

export async function ingest() {
  let allJobs = [];
  for (const cat of HEALTHCARE_CATEGORIES) {
    log(SOURCE, 'fetching category', { cat });
    try {
      let page = 1;
      while (page <= parseInt(process.env.INGEST_MAX_PAGES || '10')) {
        const data = await fetchPage(cat, page);
        const postings = data?.SearchResult?.SearchResultItems ?? [];
        if (postings.length === 0) break;
        const jobs = postings.map(transformPosting).filter(Boolean);
        allJobs.push(...jobs);
        log(SOURCE, `page ${page}`, { cat, got: jobs.length });
        if (postings.length < 250) break;
        page++;
      }
    } catch (e) {
      logError(SOURCE, e);
    }
  }

  const deduped = dedupe(allJobs);
  const normalized = deduped.map(j => normalize(j, SOURCE));

  log(SOURCE, 'upserting', { count: normalized.length });
  const { inserted } = await upsertJobs(normalized);

  await logRun(SOURCE, allJobs.length, inserted);
  log(SOURCE, 'done', { seen: allJobs.length, upserted: inserted });

  return { source: SOURCE, seen: allJobs.length, upserted: inserted };
}

// Run directly (for testing)
if (import.meta.url === `file://${process.argv[1]}`) {
  ingest().catch(err => { logError(SOURCE, err); process.exit(1); });
}
