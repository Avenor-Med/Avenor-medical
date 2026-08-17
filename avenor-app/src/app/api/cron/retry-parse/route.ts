import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/services/supabase/server';
import { processResume } from '@/services/resume.service';

export const runtime = 'nodejs';
export const maxDuration = 300;

// Retry queue for résumés whose parse failed — typically because the Claude
// API was briefly unavailable. Runs hourly (see vercel.json).
//
// This is why a parser outage never loses a candidate: the upload already
// succeeded, the file is in storage, and this sweeps up the backlog once the
// service returns.
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = supabaseAdmin();

  // Anything pending for more than 5 minutes, or explicitly failed, and not
  // yet tried 5 times.
  const cutoff = new Date(Date.now() - 5 * 60_000).toISOString();
  const { data: stuck } = await db
    .from('resumes')
    .select('id, owner_id, status, retry_count')
    .in('status', ['pending', 'failed'])
    .lt('created_at', cutoff)
    .lt('retry_count', 5)
    .is('deleted_at', null)
    .limit(25);

  const results: { id: string; ok: boolean; error?: string }[] = [];

  for (const r of stuck ?? []) {
    try {
      await processResume(r.owner_id, r.id);
      results.push({ id: r.id, ok: true });
    } catch (e) {
      await db
        .from('resumes')
        .update({
          retry_count: (r.retry_count ?? 0) + 1,
          error_message: e instanceof Error ? e.message : 'retry failed',
        })
        .eq('id', r.id);
      results.push({
        id: r.id,
        ok: false,
        error: e instanceof Error ? e.message : 'unknown',
      });
    }
  }

  return NextResponse.json({
    ok: true,
    attempted: results.length,
    succeeded: results.filter((r) => r.ok).length,
    results,
  });
}
