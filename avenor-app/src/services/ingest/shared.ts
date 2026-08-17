import type { SupabaseClient } from '@supabase/supabase-js';

// Shared helpers for job-source ingesters.

const SPECIALTY_KEYWORDS: Record<string, string[]> = {
  'ICU': ['icu', 'intensive care', 'critical care nurse'],
  'ER': ['er nurse', 'emergency room', 'emergency department'],
  'Emergency Medicine': ['emergency medicine', 'em physician'],
  'OR': ['operating room', 'perioperative', 'or nurse'],
  'PACU': ['pacu', 'post-anesthesia'],
  'Labor & Delivery': ['labor & delivery', 'l&d', 'labor and delivery'],
  'NICU': ['nicu', 'neonatal'],
  'Med-Surg': ['med-surg', 'medical surgical', 'med surg'],
  'Telemetry': ['telemetry'],
  'Cath Lab': ['cath lab', 'catheterization'],
  'Home Health': ['home health'],
  'SNF / Long-Term Care': ['skilled nursing', 'long-term care', 'long term care', 'snf'],
  'Hospitalist': ['hospitalist'],
  'Cardiology': ['cardiolog'],
  'Family Medicine': ['family medicine', 'family practice'],
  'Internal Medicine': ['internal medicine', 'internist'],
  'Pediatrics': ['pediatric'],
  'Anesthesiology': ['anesthes', 'crna'],
  'Neurology': ['neurolog'],
  'Psychiatry': ['psychiatr'],
  'Radiology': ['radiolog'],
  'General Surgery': ['general surgery', 'general surgeon'],
  'Orthopedic Surgery': ['orthoped', 'orthopaed'],
  'Urgent Care': ['urgent care'],
  'Oncology': ['oncolog'],
  'Obstetrics & Gynecology': ['ob/gyn', 'obstetric', 'gynecolog'],
};

const PROFESSION_KEYWORDS: [string, string[]][] = [
  ['CRNA', ['crna', 'nurse anesthetist']],
  ['NP', ['nurse practitioner', 'aprn']],
  ['PA', ['physician assistant', 'pa-c']],
  ['LPN', ['lpn', 'lvn', 'licensed practical', 'licensed vocational']],
  ['RN', ['registered nurse', 'rn ', ' rn', 'nurse']],
  ['MD', ['physician', 'doctor', 'md', 'hospitalist', 'surgeon', 'cardiologist', 'psychiatrist']],
];

export function inferSpecialty(title: string, description = ''): string {
  const t = `${title} ${description}`.toLowerCase();
  for (const [spec, kws] of Object.entries(SPECIALTY_KEYWORDS)) {
    if (kws.some((kw) => t.includes(kw))) return spec;
  }
  return 'General';
}

export function inferProfession(title: string, description = ''): string {
  const t = `${title} ${description}`.toLowerCase();
  for (const [prof, kws] of PROFESSION_KEYWORDS) {
    if (kws.some((kw) => t.includes(kw))) return prof;
  }
  return 'Other';
}

export const STATE_BY_NAME: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
  Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA',
  Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK',
  Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT', Vermont: 'VT',
  Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV', Wisconsin: 'WI',
  Wyoming: 'WY', 'District of Columbia': 'DC',
};

export type IngestJob = {
  id: string;
  source: string;
  title: string;
  profession: string;
  specialty: string;
  city: string | null;
  state: string | null;
  rate_usd: number | null;
  job_type: string;
  description: string | null;
  status: 'open';
  posted_at: string | null;
  last_seen_at: string;
};

export async function upsertJobs(db: SupabaseClient, jobs: IngestJob[]) {
  let upserted = 0;
  for (let i = 0; i < jobs.length; i += 500) {
    const chunk = jobs.slice(i, i + 500);
    const { error } = await db.from('jobs').upsert(chunk, { onConflict: 'id' });
    if (error) throw new Error(`upsert failed: ${error.message}`);
    upserted += chunk.length;
  }
  return upserted;
}

export function dedupe(jobs: IngestJob[]): IngestJob[] {
  const seen = new Map<string, IngestJob>();
  for (const j of jobs) {
    const key = `${j.title}|${j.city}|${j.state}`.toLowerCase();
    if (!seen.has(key)) seen.set(key, j);
  }
  return [...seen.values()];
}
