import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/services/supabase/server';
import { audit } from '@/services/audit';
import { rateLimit } from '@/utils/ratelimit';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
]);

// POST /api/resumes — authenticated upload into the private bucket.
export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  // 10 uploads per hour per user — generous for real use, stops abuse.
  const limit = rateLimit(`upload:${user.id}`, 10, 3_600_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many uploads. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 10 MB' }, { status: 413 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: 'Use PDF, DOCX, or TXT' },
      { status: 415 },
    );
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(0, 120);
  const path = `${user.id}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: row, error: insertError } = await supabase
    .from('resumes')
    .insert({
      owner_id: user.id,
      original_filename: file.name,
      storage_path: path,
      status: 'pending',
    })
    .select('id')
    .single();

  if (insertError) {
    return NextResponse.json({ error: 'Record failed' }, { status: 500 });
  }

  await audit({
    actorId: user.id,
    action: 'resume.upload',
    entity: 'resume',
    entityId: row.id,
    detail: { filename: file.name, bytes: file.size },
    ip: request.headers.get('x-forwarded-for'),
  });

  return NextResponse.json({ id: row.id, status: 'pending' }, { status: 201 });
}
