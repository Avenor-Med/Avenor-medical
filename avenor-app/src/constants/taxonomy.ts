// Canonical specialty taxonomy — ABMS specialties plus nursing/APP categories.
// The parser prompt anchors on these names so "interventional cardiology"
// never collapses into generic "cardiology", and matching stays exact.

export const SPECIALTIES = [
  'Addiction Medicine', 'Allergy & Immunology', 'Anesthesiology',
  'Cardiology', 'Interventional Cardiology', 'Electrophysiology',
  'Critical Care Medicine', 'Dermatology', 'Emergency Medicine',
  'Pediatric Emergency Medicine', 'Endocrinology', 'Family Medicine',
  'Gastroenterology', 'General Surgery', 'Geriatrics', 'Hematology',
  'Hematology Oncology', 'Hospitalist', 'Pediatric Hospitalist',
  'Infectious Disease', 'Internal Medicine', 'Interventional Radiology',
  'Neonatology', 'Nephrology', 'Neurology', 'Neurosurgery',
  'Obstetrics & Gynecology', 'Occupational Medicine', 'Oncology',
  'Radiation Oncology', 'Ophthalmology', 'Orthopedic Surgery',
  'Otolaryngology', 'Pain Management', 'Pathology', 'Pediatrics',
  'Pediatric Cardiology', 'Physical Medicine & Rehabilitation',
  'Plastic Surgery', 'Psychiatry', 'Child & Adolescent Psychiatry',
  'Pulmonology', 'Pulmonary & Critical Care', 'Radiology', 'Rheumatology',
  'Sleep Medicine', 'Sports Medicine', 'Thoracic Surgery', 'Urology',
  'Vascular Surgery', 'Urgent Care',
  // Nursing + allied
  'ICU', 'ER', 'OR', 'PACU', 'Labor & Delivery', 'NICU', 'PICU',
  'Med-Surg', 'Telemetry', 'Cath Lab', 'Oncology Nursing', 'Dialysis',
  'Home Health', 'Hospice', 'SNF / Long-Term Care', 'Psychiatric Nursing',
  'Case Management', 'Infusion', 'Wound Care', 'School Nursing',
] as const;

// Related-specialty groups: a partial-credit match ("related") scores between
// exact and unrelated. Kept intentionally small and defensible.
export const RELATED: Record<string, string[]> = {
  'Cardiology': ['Interventional Cardiology', 'Electrophysiology', 'Pediatric Cardiology'],
  'Interventional Cardiology': ['Cardiology'],
  'Hospitalist': ['Internal Medicine'],
  'Internal Medicine': ['Hospitalist', 'Family Medicine'],
  'Family Medicine': ['Internal Medicine', 'Urgent Care', 'Geriatrics'],
  'Urgent Care': ['Family Medicine', 'Emergency Medicine'],
  'Emergency Medicine': ['Urgent Care', 'Critical Care Medicine'],
  'Critical Care Medicine': ['Pulmonary & Critical Care', 'Emergency Medicine'],
  'Pulmonology': ['Pulmonary & Critical Care'],
  'ICU': ['ER', 'PACU', 'Telemetry'],
  'ER': ['ICU', 'Telemetry'],
  'Med-Surg': ['Telemetry'],
  'Telemetry': ['Med-Surg', 'ICU'],
  'NICU': ['PICU', 'Labor & Delivery'],
  'Labor & Delivery': ['NICU'],
};

// Nurse Licensure Compact states — an RN/LPN license from any of these is
// valid in all the others.
export const NLC_STATES = new Set([
  'AL','AR','AZ','CO','DE','FL','GA','GU','IA','ID','IN','KS','KY','LA',
  'MD','ME','MO','MS','MT','NC','ND','NE','NH','NJ','NM','OH','OK','PA',
  'RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY',
]);

export function specialtiesPromptList(): string {
  return SPECIALTIES.join(', ');
}
