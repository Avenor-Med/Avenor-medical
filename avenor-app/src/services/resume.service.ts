import { supabaseServer, supabaseAdmin } from '@/services/supabase/server';
import { extractText } from '@/services/extract';
import {
  scoreJob,
  licenseChecker,
  type CandidateFacts,
  type JobFacts,
} from '@/services/scoring';
import { audit } from '@/services/audit';
import { specialtiesPromptList } from '@/constants/taxonomy';
import { UPLOAD, MATCHING } from '@/constants/config';

// Résumé lifecycle: store → extract → parse → verify licenses → match.
// API routes stay thin; the sequencing and rules live here.

export type ParsedProfile = {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  profession: string | null;
  specialty: string | null;
  sub_specialties: string[];
  years_experience: number | null;
  certifications: string[];
  licenses: { state?: string; number?: string; expiration?: string }[];
  visa_status: string;
  spoken_languages: string[];
  summary: string;
};

export function buildParsePrompt(text: string): string {
  return `You are a healthcare credentialing analyst. Extract a structured profile from the résumé text below. Respond with only a JSON object — no prose — using exactly these keys:
{
  "full_name": string|null, "email": string|null, "phone": string|null,
  "profession": "MD"|"DO"|"NP"|"PA"|"CRNA"|"RN"|"LPN"|null,
  "specialty": string|null, "sub_specialties": string[],
  "years_experience": number|null, "certifications": string[],
  "licenses": [{"state": string, "number": string|null, "expiration": string|null}],
  "visa_status": "citizen"|"green_card"|"needs_sponsorship"|"unknown",
  "spoken_languages": string[], "summary": string
}
For "specialty" and "sub_specialties", use ONLY names from this canonical list (choose the closest; prefer the most specific — "Interventional Cardiology" over "Cardiology" when the résumé supports it):
${specialtiesPromptList()}
Dates in YYYY-MM-DD. If a field is not present, use null or [].

RESUME TEXT:
${text}`;
}

export function validateUpload(file: File): string | null {
  if (file.size > UPLOAD.maxBytes) return 'File exceeds 10 MB';
  if (!UPLOAD.allowedMimeTypes.includes(file.type as never)) {
    return 'Use PDF, DOCX, or TXT';
  }
  return null;
}

export async function storeResume(userId: string, file: File) {
  const supabase = await supabaseServer();
  const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(0, 120);
  const path = `${userId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(UPLOAD.bucket)
    .upload(path, file, { contentType: file.type });
  if (uploadError) throw new Error('Upload failed');

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      owner_id: userId,
      original_filename: file.name,
      storage_path: path,
      status: 'pending',
    })
    .select('id')
    .single();
  if (error) throw new Error('Record failed');

  return data.id as string;
}

export async function getResumeText(resumeId: string): Promise<string> {
  const supabase = await supabaseServer();
  const { data: resume } = await supabase
    .from('resumes')
    .select('storage_path, original_filename, raw_text')
    .eq('id', resumeId)
    .single();
  if (!resume) throw new Error('Not found');
  if (resume.raw_text) return resume.raw_text;

  const { data: blob } = await supabase.storage
    .from(UPLOAD.bucket)
    .download(resume.storage_path);
  if (!blob) throw new Error('File unavailable');

  const buffer = Buffer.from(await blob.arrayBuffer());
  const { text } = await extractText(buffer, resume.original_filename);
  return text;
}

export async function callParser(text: string): Promise<ParsedProfile> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: buildParsePrompt(text.slice(0, 30000)) }],
    }),
  });
  if (!res.ok) throw new Error('Parse service unavailable');

  const result = await res.json();
  const raw = result.content[0].text.replace(/^```json?\s*|\s*```$/g, '');
  return JSON.parse(raw) as ParsedProfile;
}

export async function persistProfile(resumeId: string, profile: ParsedProfile) {
  const admin = supabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);

  await admin.from('parsed_profiles').upsert({
    resume_id: resumeId,
    full_name: profile.full_name,
    email: profile.email,
    phone: profile.phone,
    profession: profile.profession,
    specialty: profile.specialty,
    sub_specialties: profile.sub_specialties ?? [],
    years_experience: profile.years_experience,
    certifications: profile.certifications ?? [],
    spoken_languages: profile.spoken_languages ?? [],
    summary: profile.summary,
  });

  await admin.from('licenses').delete().eq('resume_id', resumeId);
  for (const lic of profile.licenses ?? []) {
    if (!lic.state) continue;
    const expired = !!(lic.expiration && lic.expiration < today);
    await admin.from('licenses').insert({
      resume_id: resumeId,
      state: lic.state.slice(0, 2).toUpperCase(),
      license_number: lic.number ?? null,
      profession: profile.profession,
      expiration_date: lic.expiration ?? null,
      verification_status: expired ? 'expired' : 'date_valid',
    });
  }
}

export async function matchProfileToJobs(
  resumeId: string,
  profile: ParsedProfile,
) {
  const admin = supabaseAdmin();
  const { data: jobs } = await admin
    .from('jobs')
    .select('id, profession, specialty, state, visa_support')
    .eq('status', 'open')
    .is('deleted_at', null)
    .limit(10000);

  const licenses = (profile.licenses ?? []).map((l) => ({
    state: l.state ?? '',
    expiration: l.expiration ?? null,
  }));

  const candidate: CandidateFacts = {
    profession: profile.profession,
    specialty: profile.specialty,
    subSpecialties: profile.sub_specialties ?? [],
    yearsExperience: Number(profile.years_experience) || 0,
    licenseStates: new Set(licenses.map((l) => l.state.toUpperCase())),
    hasActiveLicense: licenseChecker(licenses, profile.profession),
    needsVisa: profile.visa_status === 'needs_sponsorship',
    certifications: profile.certifications ?? [],
  };

  type Match = NonNullable<ReturnType<typeof scoreJob>>;

  const matches = ((jobs ?? []) as JobFacts[])
    .map((j: JobFacts) => scoreJob(candidate, j))
    .filter((m: Match | null): m is Match => m !== null)
    .sort((a: Match, b: Match) => b.matchPct - a.matchPct)
    .slice(0, MATCHING.topMatches);

  await admin.from('job_matches').delete().eq('resume_id', resumeId);
  for (const m of matches) {
    await admin.from('job_matches').insert({
      resume_id: resumeId,
      job_id: m.jobId,
      match_pct: m.matchPct,
      reasons: m.reasons,
      flags: m.flags,
    });
  }
  return matches;
}

export async function processResume(userId: string, resumeId: string) {
  const text = await getResumeText(resumeId);
  if (text.trim().length < 100) {
    await supabaseAdmin()
      .from('resumes')
      .update({ status: 'failed', error_message: 'image-only or empty document' })
      .eq('id', resumeId);
    throw new Error(
      'Not enough extractable text — likely a scanned PDF. Send a text-based copy.',
    );
  }

  const profile = await callParser(text);
  await persistProfile(resumeId, profile);
  const matches = await matchProfileToJobs(resumeId, profile);

  await supabaseAdmin()
    .from('resumes')
    .update({ status: 'matched', raw_text: text.slice(0, 100000), error_message: null })
    .eq('id', resumeId);

  await audit({
    actorId: userId,
    action: 'resume.parsed',
    entity: 'resume',
    entityId: resumeId,
    detail: { matches: matches.length, specialty: profile.specialty },
  });

  return { profile, matches };
}
