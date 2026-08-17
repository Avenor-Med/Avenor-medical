import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, supabaseAdmin } from '@/services/supabase/server';
import { audit } from '@/services/audit';
import { extractText } from '@/services/extract';
import { specialtiesPromptList } from '@/constants/taxonomy';
import { scoreJob, licenseChecker, type CandidateFacts, type JobFacts } from '@/services/scoring';
import { rateLimit } from '@/utils/ratelimit';

export const runtime = 'nodejs';
export const maxDuration = 60;

function buildPrompt(text: string) {
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

// POST /api/resumes/:id/parse — extract structured profile via Claude,
// verify license currency, persist, score against open jobs.
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  // Each parse costs an API call — cap at 20/hour per user.
  const limit = rateLimit(`parse:${user.id}`, 20, 3_600_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many parse requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  // RLS guarantees the caller owns this resume (or is staff).
  const { data: resume } = await supabase
    .from('resumes')
    .select('id, storage_path, original_filename, raw_text, status')
    .eq('id', params.id)
    .single();

  if (!resume) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // --- Text: cached, or download + extract by file type -----------------
  let text = resume.raw_text ?? '';
  if (!text) {
    const { data: blob } = await supabase.storage
      .from('resumes')
      .download(resume.storage_path);
    if (!blob) {
      return NextResponse.json({ error: 'File unavailable' }, { status: 500 });
    }
    const buffer = Buffer.from(await blob.arrayBuffer());
    const extracted = await extractText(buffer, resume.original_filename);
    text = extracted.text;
  }

  if (text.trim().length < 100) {
    await supabaseAdmin()
      .from('resumes')
      .update({ status: 'failed', error_message: 'image-only or empty document' })
      .eq('id', params.id);
    return NextResponse.json(
      { error: 'Not enough extractable text — likely a scanned PDF. Send a text-based copy.' },
      { status: 422 },
    );
  }

  // --- Claude parse ------------------------------------------------------
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: buildPrompt(text.slice(0, 30000)) }],
    }),
  });

  if (!anthropicRes.ok) {
    await audit({ actorId: user.id, action: 'resume.parse_failed', entity: 'resume', entityId: params.id });
    return NextResponse.json({ error: 'Parse service unavailable' }, { status: 502 });
  }

  const result = await anthropicRes.json();
  let profile: Record<string, unknown>;
  try {
    const raw = result.content[0].text.replace(/^```json?\s*|\s*```$/g, '');
    profile = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Unparseable résumé format' }, { status: 422 });
  }

  // --- Persist profile + licenses (license currency checked here) --------
  const admin = supabaseAdmin();
  await admin.from('parsed_profiles').upsert({
    resume_id: params.id,
    full_name: profile.full_name,
    email: profile.email,
    phone: profile.phone,
    profession: profile.profession,
    specialty: profile.specialty,
    sub_specialties: profile.sub_specialties ?? [],
    years_experience: profile.years_experience,
    certifications: profile.certifications ?? [],
    spoken_languages: profile.spoken_languages ?? [],
    visa_status: profile.visa_status ?? 'unknown',
    summary: profile.summary,
  });

  const today = new Date().toISOString().slice(0, 10);
  const licenses = (Array.isArray(profile.licenses) ? profile.licenses : []) as {
    state?: string; number?: string; expiration?: string;
  }[];

  await admin.from('licenses').delete().eq('resume_id', params.id);
  for (const lic of licenses) {
    if (!lic.state) continue;
    const expired = !!(lic.expiration && lic.expiration < today);
    await admin.from('licenses').insert({
      resume_id: params.id,
      state: lic.state.slice(0, 2).toUpperCase(),
      license_number: lic.number ?? null,
      profession: profile.profession,
      expiration_date: lic.expiration ?? null,
      // Primary-source board verification runs in the credentialing queue;
      // date-based currency is checked immediately.
      verification_status: expired ? 'expired' : 'date_valid',
    });
  }

  // --- Score every open job with the weighted rubric ---------------------
  const { data: jobs } = await admin
    .from('jobs')
    .select('id, profession, specialty, state, visa_support')
    .eq('status', 'open')
    .is('deleted_at', null)
    .limit(10000);

  const candidate: CandidateFacts = {
    profession: (profile.profession as string) ?? null,
    specialty: (profile.specialty as string) ?? null,
    subSpecialties: (profile.sub_specialties as string[]) ?? [],
    yearsExperience: Number(profile.years_experience) || 0,
    licenseStates: new Set(
      licenses.map((l) => l.state?.toUpperCase()).filter(Boolean) as string[],
    ),
    hasActiveLicense: licenseChecker(
      licenses.map((l) => ({ state: l.state ?? '', expiration: l.expiration ?? null })),
      (profile.profession as string) ?? null,
    ),
    needsVisa: profile.visa_status === 'needs_sponsorship',
    certifications: (profile.certifications as string[]) ?? [],
  };

  const matches = (jobs ?? [])
    .map((j: JobFacts) => scoreJob(candidate, j))
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .sort((a, b) => b.matchPct - a.matchPct)
    .slice(0, 10);

  await admin.from('job_matches').delete().eq('resume_id', params.id);
  for (const m of matches) {
    await admin.from('job_matches').insert({
      resume_id: params.id,
      job_id: m.jobId,
      match_pct: m.matchPct,
      reasons: m.reasons,
      flags: m.flags,
    });
  }

  await admin
    .from('resumes')
    .update({ status: 'matched', raw_text: text.slice(0, 100000), error_message: null })
    .eq('id', params.id);

  await audit({
    actorId: user.id,
    action: 'resume.parsed',
    entity: 'resume',
    entityId: params.id,
    detail: { matches: matches.length, specialty: profile.specialty, profession: profile.profession },
  });

  return NextResponse.json({ profile, matches });
}
