import type { SupabaseClient } from '@supabase/supabase-js';
import { inferSpecialty, inferProfession, upsertJobs, dedupe, STATE_BY_NAME, type IngestJob } from './shared';

// Adzuna — US healthcare aggregate. Free tier: 1,000 calls/day.
// Keys: developer.adzuna.com
export async function ingestAdzuna(db: SupabaseClient) {
  if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
    return { seen: 0, upserted: 0 };
  }

  const now = new Date().toISOString();
  const all: IngestJob[] = [];

  for (let page = 1; page <= 20; page++) {
    const url = new URL(`https://api.adzuna.com/v1/api/jobs/us/search/${page}`);
    url.searchParams.set('app_id', process.env.ADZUNA_APP_ID);
    url.searchParams.set('app_key', process.env.ADZUNA_APP_KEY);
    url.searchParams.set('results_per_page', '50');
    url.searchParams.set('category', 'healthcare-nursing-jobs');

    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();
    const items = data.results ?? [];
    if (items.length === 0) break;

    for (const j of items) {
      const area = j.location?.area ?? [];
      all.push({
        id: `adzuna::${j.id}`,
        source: 'adzuna',
        title: j.title,
        profession: inferProfession(j.title, j.description ?? ''),
        specialty: inferSpecialty(j.title, j.description ?? ''),
        city: area[2] ?? null,
        state: STATE_BY_NAME[area[1]] ?? null,
        rate_usd: j.salary_min ? Math.round(j.salary_min / 2080) : null,
        job_type: j.contract_time === 'part_time' ? 'Per Diem' : 'Permanent',
        description: (j.description ?? '').slice(0, 4000),
        status: 'open',
        posted_at: j.created ?? null,
        last_seen_at: now,
      });
    }
    if (items.length < 50) break;
    await new Promise((r) => setTimeout(r, 200));
  }

  const jobs = dedupe(all);
  const upserted = await upsertJobs(db, jobs);
  return { seen: all.length, upserted };
}
