import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/services/supabase/server';
import { ingestUsaJobs } from '@/services/ingest/usajobs';
import { ingestAdzuna } from '@/services/ingest/adzuna';
import { ingestJooble } from '@/services/ingest/jooble';
import { ingestTheMuse } from '@/services/ingest/themuse';

export const runtime = 'nodejs';
export const maxDuration = 300;

// Nightly job ingestion — triggered by Vercel Cron (vercel.json).
// Each source is independent: one failing does not stop the others.
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = supabaseAdmin();
  const results: Record<string, unknown>[] = [];

  const sources: [string, () => Promise<{ seen: number; upserted: number }>][] = [
    ['usajobs', () => ingestUsaJobs(db)],
    ['adzuna', () => ingestAdzuna(db)],
    ['jooble', () => ingestJooble(db)],
    ['themuse', () => ingestTheMuse(db)],
  ];

  for (const [name, run] of sources) {
    try {
      const r = await run();
      results.push({ source: name, ok: true, ...r });
    } catch (e) {
      results.push({
        source: name,
        ok: false,
        error: e instanceof Error ? e.message : 'unknown',
      });
    }
  }

  // Expire listings a source stopped reporting (not seen in 3 days).
  const cutoff = new Date(Date.now() - 3 * 86400_000).toISOString();
  await db
    .from('jobs')
    .update({ status: 'expired' })
    .neq('source', 'seed')
    .lt('last_seen_at', cutoff)
    .eq('status', 'open');

  return NextResponse.json({ ok: true, results });
}
