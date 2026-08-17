import { RELATED, NLC_STATES } from '@/constants/taxonomy';

// Weighted match rubric:
//   40  specialty  (exact 40 / related 25 / same-profession-generic 10)
//   25  license    (job-state license 25 / compact-eligible 20 / none 0)
//   15  experience (>=3yrs 15 / >=2 12 / >=1 8 / <1 3)
//   10  schedule   (reserved — candidate shift preference; default 6)
//   10  bonus      (visa need met, bilingual, certifications)
// Weights validated against the pilot resume batch before launch.

export type CandidateFacts = {
  profession: string | null;
  specialty: string | null;
  subSpecialties: string[];
  yearsExperience: number;
  licenseStates: Set<string>;
  hasActiveLicense: (state: string) => 'active' | 'compact' | 'expired' | 'none';
  needsVisa: boolean;
  certifications: string[];
};

export type JobFacts = {
  id: string;
  profession: string | null;
  specialty: string | null;
  state: string | null;
  visa_support: boolean | null;
};

export function scoreJob(c: CandidateFacts, j: JobFacts) {
  const reasons: string[] = [];
  const flags: string[] = [];
  let score = 0;

  // Hard filter: profession mismatch is not a match at all.
  if (c.profession && j.profession && c.profession !== j.profession) {
    return null;
  }

  // Specialty — 40
  if (c.specialty && j.specialty) {
    if (c.specialty === j.specialty || c.subSpecialties.includes(j.specialty)) {
      score += 40;
      reasons.push(`Specialty match: ${j.specialty}`);
    } else if (RELATED[c.specialty]?.includes(j.specialty)) {
      score += 25;
      reasons.push(`Related specialty: ${c.specialty} → ${j.specialty}`);
    } else {
      score += 5;
      flags.push(`Specialty differs (${c.specialty} vs ${j.specialty})`);
    }
  } else {
    score += 10;
  }

  // License — 25
  if (j.state) {
    const lic = c.hasActiveLicense(j.state);
    if (lic === 'active') {
      score += 25;
      reasons.push(`Licensed in ${j.state}`);
    } else if (lic === 'compact') {
      score += 20;
      reasons.push(`Compact license covers ${j.state}`);
    } else if (lic === 'expired') {
      score += 8;
      flags.push(`${j.state} license on file but expired — renewal required`);
    } else {
      flags.push(`Needs ${j.state} license`);
    }
  }

  // Experience — 15
  const yrs = c.yearsExperience;
  if (yrs >= 3) score += 15;
  else if (yrs >= 2) score += 12;
  else if (yrs >= 1) score += 8;
  else {
    score += 3;
    flags.push('Under 1 year experience — may not meet minimums');
  }

  // Schedule — 10 (default until shift preferences are collected at intake)
  score += 6;

  // Bonus — 10
  if (c.needsVisa) {
    if (j.visa_support) {
      score += 6;
      reasons.push('Visa sponsorship available');
    } else {
      flags.push('Candidate needs visa support; role does not offer it');
    }
  } else {
    score += 4;
  }
  if (c.certifications.length >= 3) score += 4;

  return { jobId: j.id, matchPct: Math.min(99, score), reasons, flags };
}

export function licenseChecker(
  licenses: { state: string; expiration: string | null }[],
  profession: string | null,
) {
  const today = new Date().toISOString().slice(0, 10);
  const active = new Set<string>();
  const expired = new Set<string>();
  for (const l of licenses) {
    const st = l.state?.toUpperCase();
    if (!st) continue;
    if (l.expiration && l.expiration < today) expired.add(st);
    else active.add(st);
  }
  const isNurse = profession === 'RN' || profession === 'LPN';
  const hasCompact = isNurse && [...active].some((s) => NLC_STATES.has(s));

  return (state: string): 'active' | 'compact' | 'expired' | 'none' => {
    const st = state.toUpperCase();
    if (active.has(st)) return 'active';
    if (hasCompact && NLC_STATES.has(st)) return 'compact';
    if (expired.has(st)) return 'expired';
    return 'none';
  };
}
