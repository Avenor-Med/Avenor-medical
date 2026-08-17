// scrapers/shared/normalize.js
// Normalize job data across many sources into the schema our DB uses.
import { z } from 'zod';

// Canonical specialty taxonomy — used to match aggregated titles/descriptions
// against our internal specialties. Extendable as needed.
const SPECIALTY_KEYWORDS = {
  'ICU':                          ['icu', 'intensive care', 'critical care'],
  'ER':                           ['er ', 'emergency room', 'emergency department'],
  'Emergency Medicine':           ['emergency medicine', 'em physician'],
  'OR':                           ['or nurse', 'operating room', 'perioperative'],
  'PACU':                         ['pacu', 'post-anesthesia'],
  'Labor & Delivery':             ['labor & delivery', 'l&d', 'labor and delivery'],
  'NICU':                         ['nicu', 'neonatal'],
  'Med-Surg':                     ['med-surg', 'medical surgical', 'med surg'],
  'Telemetry':                    ['telemetry', 'tele nurse'],
  'Cath Lab':                     ['cath lab', 'cardiac catheterization'],
  'Home Health':                  ['home health'],
  'SNF / Long-Term Care':         ['snf', 'skilled nursing', 'long-term care', 'long term care'],
  'Hospitalist':                  ['hospitalist'],
  'Pediatric Hospitalist':        ['pediatric hospitalist'],
  'Cardiology':                   ['cardiologist', 'cardiology'],
  'Interventional Cardiology':    ['interventional cardiology'],
  'Family Medicine':              ['family medicine', 'family practice'],
  'Internal Medicine':            ['internal medicine', 'internist'],
  'Pediatrics':                   ['pediatric'],
  'Anesthesiology':               ['anesthesia', 'crna', 'anesthesiologist'],
  'Neurology':                    ['neurology', 'neurologist'],
  'Psychiatry':                   ['psychiatry', 'psychiatrist'],
  'Radiology':                    ['radiology', 'radiologist'],
  'General Surgery':              ['general surgery', 'general surgeon'],
  'Orthopedic Surgery':           ['orthopedic', 'orthopaedic'],
  'Urgent Care':                  ['urgent care']
};

const PROFESSION_KEYWORDS = {
  'RN':   ['rn ', 'registered nurse', ' nurse', 'nursing'],
  'LPN':  ['lpn', 'lvn', 'licensed practical', 'licensed vocational'],
  'NP':   ['nurse practitioner', 'np ', 'aprn'],
  'PA':   ['physician assistant', 'pa-c', 'pa '],
  'CRNA': ['crna', 'nurse anesthetist'],
  'MD':   ['physician', 'md ', 'do ', 'doctor', 'attending']
};

export function inferSpecialty(title, description = '') {
  const t = `${title} ${description}`.toLowerCase();
  for (const [spec, kws] of Object.entries(SPECIALTY_KEYWORDS)) {
    if (kws.some(kw => t.includes(kw))) return spec;
  }
  return 'General';
}

export function inferProfession(title, description = '') {
  const t = `${title} ${description}`.toLowerCase();
  for (const [prof, kws] of Object.entries(PROFESSION_KEYWORDS)) {
    if (kws.some(kw => t.includes(kw))) return prof;
  }
  return 'Unknown';
}

// Normalized job schema — matches the `jobs` table in Supabase
export const JobSchema = z.object({
  id: z.string(),               // stable id: `${source}::${source_id}`
  source: z.string(),           // 'hca', 'adzuna', 'usajobs', etc.
  facility_id: z.string().nullable(),
  title: z.string(),
  profession: z.string(),
  specialty: z.string(),
  city: z.string().nullable(),
  state: z.string().length(2).nullable(),
  shift_type: z.string().nullable(),
  hours_per_week: z.number().int().nullable(),
  duration_weeks: z.number().int().nullable(),
  rate_usd: z.number().nullable(),
  job_type: z.string().nullable(),        // Travel|Locums|Permanent|Per Diem
  visa_support: z.boolean().nullable(),
  signing_bonus_usd: z.number().int().nullable(),
  requirements: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string(),
  posted_at: z.string().datetime().nullable(),
  expires_at: z.string().datetime().nullable(),
  last_seen_at: z.string().datetime()
});

export function normalize(job, source) {
  return JobSchema.parse({
    ...job,
    id: `${source}::${job.source_id ?? job.id}`,
    source,
    last_seen_at: new Date().toISOString()
  });
}

// Deduplicate jobs across sources (same title + facility + state)
export function dedupe(jobs) {
  const seen = new Map();
  for (const j of jobs) {
    const key = `${j.title}|${j.facility_id}|${j.state}`.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, j);
    }
  }
  return Array.from(seen.values());
}
