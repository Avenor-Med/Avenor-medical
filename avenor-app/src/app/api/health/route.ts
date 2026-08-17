import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/services/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/health — machine-readable status for uptime monitors.
// Returns 200 while the site can still accept résumés, 503 only when it
// genuinely cannot. Degraded (parser down, ingest stale) is still 200:
// uploads queue safely, so paging someone at 3am would be noise.
export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string; ms?: number }> = {};
  const started = Date.now();

  // --- Database ---
  try {
    const t = Date.now();
    const db = supabaseAdmin();
    const { error } = await db.from('jobs').select('id', { head: true, count: 'exact' }).limit(1);
    checks.database = error
      ? { ok: false, detail: error.message }
      : { ok: true, ms: Date.now() - t };
  } catch (e) {
    checks.database = { ok: false, detail: e instanceof Error ? e.message : 'unreachable' };
  }

  // --- Storage (résumé bucket) ---
  try {
    const t = Date.now();
    const db = supabaseAdmin();
    const { error } = await db.storage.from('resumes').list('', { limit: 1 });
    checks.storage = error
      ? { ok: false, detail: error.message }
      : { ok: true, ms: Date.now() - t };
  } catch (e) {
    checks.storage = { ok: false, detail: e instanceof Error ? e.message : 'unreachable' };
  }

  // --- Parser credentials present (we don't spend a token to check) ---
  checks.parser = process.env.ANTHROPIC_API_KEY
    ? { ok: true }
    : { ok: false, detail: 'ANTHROPIC_API_KEY not configured' };

  // --- Ingest freshness: have we seen new jobs in the last 48h? ---
  try {
    const db = supabaseAdmin();
    const { data } = await db
      .from('jobs')
      .select('last_seen_at')
      .neq('source', 'seed')
      .order('last_seen_at', { ascending: false })
      .limit(1);
    const last = data?.[0]?.last_seen_at ? new Date(data[0].last_seen_at) : null;
    const hours = last ? Math.round((Date.now() - last.getTime()) / 3_600_000) : null;
    checks.ingest = hours === null
      ? { ok: true, detail: 'no external sources yet' }
      : { ok: hours < 48, detail: `last ingest ${hours}h ago` };
  } catch {
    checks.ingest = { ok: true, detail: 'not checked' };
  }

  // Résumé intake needs database + storage. Nothing else blocks it.
  const canAcceptResumes = checks.database.ok && checks.storage.ok;
  const allOk = Object.values(checks).every((c) => c.ok);

  return NextResponse.json(
    {
      status: allOk ? 'healthy' : canAcceptResumes ? 'degraded' : 'down',
      canAcceptResumes,
      checks,
      totalMs: Date.now() - started,
      at: new Date().toISOString(),
    },
    { status: canAcceptResumes ? 200 : 503 },
  );
}
