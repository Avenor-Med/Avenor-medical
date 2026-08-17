import type { SupabaseClient } from '@supabase/supabase-js';
import { inferSpecialty, inferProfession, upsertJobs, dedupe, type IngestJob } from './shared';

// The Muse — free public API, larger employers. No key required.
export async function ingestTheMuse(db: SupabaseClient) {
  const now = new Date().toISOString();
  const all: IngestJob[] = [];

  for (let page = 0; page < 10; page++) {
    const url = new URL('https://www.themuse.com/api/public/jobs');
    url.searchParams.set('category', 'Healthcare');
    url.searchParams.set('page', String(page));

    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();
    const items = data.results ?? [];
    if (items.length === 0) break;

    for (const j of items) {
      const loc = j.locations?.[0]?.name ?? '';
      const [city, st] = loc.split(',').map((s: string) => s.trim());
      const state = st && /^[A-Z]{2}$/.test(st) ? st : null;
      if (!state) continue; // skip remote/international
      all.push({
        id: `themuse::${j.id}`,
        source: 'themuse',
        title: j.name,
        profession: inferProfession(j.name, j.contents ?? ''),
        specialty: inferSpecialty(j.name, j.contents ?? ''),
        city: city || null,
        state,
        rate_usd: null,
        job_type: 'Permanent',
        description: (j.contents ?? '').replace(/<[^>]+>/g, '').slice(0, 4000),
        status: 'open',
        posted_at: j.publication_date ?? null,
        last_seen_at: now,
      });
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  const jobs = dedupe(all);
  const upserted = await upsertJobs(db, jobs);
  return { seen: all.length, upserted };
}
