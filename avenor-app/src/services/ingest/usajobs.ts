import type { SupabaseClient } from '@supabase/supabase-js';
import { inferSpecialty, inferProfession, upsertJobs, dedupe, type IngestJob } from './shared';

// USAJobs — VA + military healthcare. Free; requires only an email User-Agent
// (and optionally an API key for higher limits: developer.usajobs.gov).
const CATEGORIES = ['0602', '0603', '0610', '0620', '0660'];

export async function ingestUsaJobs(db: SupabaseClient) {
  const now = new Date().toISOString();
  const all: IngestJob[] = [];

  for (const cat of CATEGORIES) {
    for (let page = 1; page <= 4; page++) {
      const url = new URL('https://data.usajobs.gov/api/search');
      url.searchParams.set('JobCategoryCode', cat);
      url.searchParams.set('ResultsPerPage', '250');
      url.searchParams.set('Page', String(page));

      const headers: Record<string, string> = {
        Host: 'data.usajobs.gov',
        'User-Agent': process.env.USAJOBS_EMAIL ?? 'ops@avenormedical.com',
      };
      if (process.env.USAJOBS_AUTH_KEY) headers['Authorization-Key'] = process.env.USAJOBS_AUTH_KEY;

      const res = await fetch(url, { headers });
      if (!res.ok) break;
      const data = await res.json();
      const items = data?.SearchResult?.SearchResultItems ?? [];
      if (items.length === 0) break;

      for (const item of items) {
        const d = item.MatchedObjectDescriptor;
        if (!d) continue;
        const loc = d.PositionLocation?.[0];
        const pay = d.PositionRemuneration?.[0];
        all.push({
          id: `usajobs::${d.PositionID}`,
          source: 'usajobs',
          title: d.PositionTitle,
          profession: inferProfession(d.PositionTitle, d.QualificationSummary ?? ''),
          specialty: inferSpecialty(d.PositionTitle, d.QualificationSummary ?? ''),
          city: loc?.CityName ?? null,
          state: loc?.CountrySubDivisionCode?.slice(0, 2) ?? null,
          rate_usd: pay?.MinimumRange ? Math.round(parseFloat(pay.MinimumRange) / 2080) : null,
          job_type: 'Permanent',
          description: (d.UserArea?.Details?.JobSummary ?? '').slice(0, 4000),
          status: 'open',
          posted_at: d.PublicationStartDate ?? null,
          last_seen_at: now,
        });
      }
      if (items.length < 250) break;
    }
  }

  const jobs = dedupe(all);
  const upserted = await upsertJobs(db, jobs);
  return { seen: all.length, upserted };
}
