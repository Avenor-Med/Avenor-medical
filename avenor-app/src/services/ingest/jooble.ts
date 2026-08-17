import type { SupabaseClient } from '@supabase/supabase-js';
import { inferSpecialty, inferProfession, upsertJobs, dedupe, type IngestJob } from './shared';

// Jooble — free aggregator API. Key: jooble.org/api/about
const KEYWORDS = [
  'registered nurse', 'nurse practitioner', 'physician assistant',
  'physician', 'CRNA', 'hospitalist',
];

export async function ingestJooble(db: SupabaseClient) {
  if (!process.env.JOOBLE_API_KEY) return { seen: 0, upserted: 0 };

  const now = new Date().toISOString();
  const all: IngestJob[] = [];

  for (const kw of KEYWORDS) {
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(`https://jooble.org/api/${process.env.JOOBLE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: kw, location: 'United States', page }),
      });
      if (!res.ok) break;
      const data = await res.json();
      const items = data.jobs ?? [];
      if (items.length === 0) break;

      for (const j of items) {
        const m = (j.location ?? '').match(/([\w.\s]+),\s*([A-Z]{2})/);
        all.push({
          id: `jooble::${j.id ?? j.link}`,
          source: 'jooble',
          title: j.title,
          profession: inferProfession(j.title, j.snippet ?? ''),
          specialty: inferSpecialty(j.title, j.snippet ?? ''),
          city: m?.[1]?.trim() ?? null,
          state: m?.[2] ?? null,
          rate_usd: null,
          job_type: 'Permanent',
          description: (j.snippet ?? '').replace(/<[^>]+>/g, '').slice(0, 4000),
          status: 'open',
          posted_at: j.updated ?? null,
          last_seen_at: now,
        });
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  const jobs = dedupe(all);
  const upserted = await upsertJobs(db, jobs);
  return { seen: all.length, upserted };
}
