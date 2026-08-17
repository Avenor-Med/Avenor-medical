import type { MetadataRoute } from 'next';
import { supabaseServer } from '@/services/supabase/server';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avenormedical.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/jobs`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE}/signup`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/login`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/legal/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/legal/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  try {
    const supabase = await supabaseServer();
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, updated_at')
      .eq('status', 'open')
      .is('deleted_at', null)
      .order('posted_at', { ascending: false })
      .limit(5000);

    const jobRoutes: MetadataRoute.Sitemap = (jobs ?? []).map((j) => ({
      url: `${BASE}/jobs/${encodeURIComponent(j.id)}`,
      lastModified: j.updated_at ? new Date(j.updated_at) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...jobRoutes];
  } catch {
    // Sitemap must never break the build if the database is unreachable.
    return staticRoutes;
  }
}
