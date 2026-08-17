// scrapers/shared/db.js
// Supabase upsert helpers used by every ingester.
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
}

export const db = createClient(url, key, {
  auth: { persistSession: false }
});

/**
 * Upsert a facility row. Idempotent — safe to call multiple times per run.
 * @param {object} facility  { source_id, name, city, state, type, ats_source }
 */
export async function upsertFacility(facility) {
  const { data, error } = await db
    .from('facilities')
    .upsert(facility, { onConflict: 'source_id', ignoreDuplicates: false })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

/**
 * Bulk upsert jobs. Existing job IDs are updated (fresh rate, status, etc).
 * @param {object[]} jobs
 */
export async function upsertJobs(jobs) {
  if (jobs.length === 0) return { inserted: 0 };

  const chunks = [];
  for (let i = 0; i < jobs.length; i += 500) {
    chunks.push(jobs.slice(i, i + 500));
  }

  let total = 0;
  for (const chunk of chunks) {
    const { error, count } = await db
      .from('jobs')
      .upsert(chunk, { onConflict: 'id', ignoreDuplicates: false, count: 'exact' });
    if (error) throw error;
    total += count ?? chunk.length;
  }
  return { inserted: total };
}

/**
 * Mark jobs from a given source as expired if we haven't seen them in this run.
 * Used to hide job listings that have been removed from the source.
 * @param {string} source        e.g. 'hca', 'adzuna'
 * @param {Date}   thresholdAt   jobs last-seen before this become 'expired'
 */
export async function expireStaleJobs(source, thresholdAt) {
  const { data, error } = await db
    .from('jobs')
    .update({ status: 'expired' })
    .eq('source', source)
    .lt('last_seen_at', thresholdAt.toISOString())
    .select('id');
  if (error) throw error;
  return data.length;
}

/**
 * Insert a run log so we can debug ingestion issues later.
 */
export async function logRun(source, jobsSeen, jobsUpserted, errorMessage = null) {
  await db.from('processing_log').insert({
    agent_name: `ingest-${source}`,
    input_tokens: 0,
    output_tokens: 0,
    cost_usd: 0,
    duration_ms: 0,
    result_status: errorMessage ? 'error' : 'success',
    error_message: errorMessage,
    metadata: { jobs_seen: jobsSeen, jobs_upserted: jobsUpserted }
  });
}
