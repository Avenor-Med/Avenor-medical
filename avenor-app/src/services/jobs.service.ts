import { supabaseServer } from '@/services/supabase/server';
import { PAGINATION } from '@/constants/config';

// All job data access lives here. Pages and API routes call these functions —
// no component builds its own query.

export type JobFilters = {
  state?: string;
  specialty?: string;
  profession?: string;
  page?: number;
  perPage?: number;
};

export type JobSummary = {
  id: string;
  title: string;
  profession: string | null;
  specialty: string | null;
  city: string | null;
  state: string | null;
  shift_type: string | null;
  hours_per_week: number | null;
  duration_weeks: number | null;
  rate_usd: number | null;
  job_type: string | null;
  visa_support: boolean | null;
  posted_at: string | null;
  facilities: { name: string } | null;
};

const SUMMARY_COLUMNS =
  'id, title, profession, specialty, city, state, shift_type, hours_per_week, duration_weeks, rate_usd, job_type, visa_support, posted_at, facilities(name)';

export async function listOpenJobs(filters: JobFilters = {}) {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = Math.min(
    filters.perPage ?? PAGINATION.jobsPerPage,
    PAGINATION.apiMaxPerPage,
  );

  const supabase = await supabaseServer();
  let query = supabase
    .from('jobs')
    .select(SUMMARY_COLUMNS, { count: 'exact' })
    .eq('status', 'open')
    .is('deleted_at', null)
    .order('posted_at', { ascending: false, nullsFirst: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (filters.state) query = query.eq('state', filters.state);
  if (filters.specialty) query = query.eq('specialty', filters.specialty);
  if (filters.profession) query = query.eq('profession', filters.profession);

  const { data, count, error } = await query;
  if (error) throw new Error(`listOpenJobs failed: ${error.message}`);

  return {
    jobs: (data ?? []) as unknown as JobSummary[],
    total: count ?? 0,
    page,
    perPage,
    totalPages: Math.ceil((count ?? 0) / perPage),
  };
}

export async function getJobById(id: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from('jobs')
    .select(
      `${SUMMARY_COLUMNS.replace('facilities(name)', 'facilities(name, type)')}, requirements, description`,
    )
    .eq('id', decodeURIComponent(id))
    .eq('status', 'open')
    .is('deleted_at', null)
    .maybeSingle();
  return data;
}

export async function countOpenJobs(): Promise<number> {
  const supabase = await supabaseServer();
  const { count } = await supabase
    .from('jobs')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'open')
    .is('deleted_at', null);
  return count ?? 0;
}

export async function listJobIdsForSitemap(limit = 5000) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from('jobs')
    .select('id, updated_at')
    .eq('status', 'open')
    .is('deleted_at', null)
    .order('posted_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}
