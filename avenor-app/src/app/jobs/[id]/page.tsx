import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseServer } from '@/services/supabase/server';

export const revalidate = 600;

type Props = { params: { id: string } };

async function getJob(id: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from('jobs')
    .select(
      'id, title, profession, specialty, city, state, shift_type, hours_per_week, duration_weeks, job_type, visa_support, requirements, description, posted_at, facilities(name, type)',
    )
    .eq('id', decodeURIComponent(id))
    .eq('status', 'open')
    .is('deleted_at', null)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob(params.id);
  if (!job) return { title: 'Position not found — Avenor Medical' };

  const facility = (job.facilities as { name: string } | null)?.name ?? '';
  return {
    title: `${job.title} — ${facility} | Avenor Medical`,
    description: `${job.profession} position in ${job.city}, ${job.state}. Fully credentialed placement through Avenor Medical.`,
    openGraph: {
      title: `${job.title} — ${facility}`,
      description: `${job.specialty} · ${job.city}, ${job.state}`,
      type: 'article',
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const job = await getJob(params.id);
  if (!job) notFound();

  const facility = job.facilities as { name: string; type: string } | null;

  // Google Jobs structured data — puts these listings in Google's job search.
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description ?? job.title,
    datePosted: job.posted_at,
    employmentType: job.job_type === 'Permanent' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Avenor Medical',
      sameAs: 'https://avenormedical.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city,
        addressRegion: job.state,
        addressCountry: 'US',
      },
    },
    occupationalCategory: job.specialty,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <Link href="/jobs" className="text-sm text-brass-dark hover:underline">
        ← All positions
      </Link>

      <header className="mt-6 border-b border-slate-200 pb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass-dark">
          {job.profession} · {job.specialty}
        </span>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-navy">
          {job.title}
        </h1>
        <p className="mt-2 text-slate-600">
          {facility?.name} · {job.city}, {job.state}
        </p>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[
          ['Schedule', job.shift_type ?? '—'],
          ['Hours', job.hours_per_week ? `${job.hours_per_week}/wk` : '—'],
          ['Duration', job.duration_weeks ? `${job.duration_weeks} weeks` : job.job_type],
          ['Visa support', job.visa_support ? 'Available' : 'Not offered'],
        ].map(([label, value]) => (
          <div key={label as string}>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-navy">{value}</dd>
          </div>
        ))}
      </dl>

      {job.description && (
        <section className="mt-10">
          <h2 className="font-serif text-xl text-navy">About this position</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            {job.description}
          </p>
        </section>
      )}

      {job.requirements && (
        <section className="mt-8">
          <h2 className="font-serif text-xl text-navy">Requirements</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            {job.requirements}
          </p>
        </section>
      )}

      <section className="mt-12 border border-brass/30 bg-cream-soft p-8 text-center">
        <h2 className="font-serif text-xl text-navy">Interested in this role?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          Create an account and upload your résumé — we handle credentialing
          before your file reaches the facility.
        </p>
        <Link
          href="/signup"
          className="mt-5 inline-block bg-brass px-8 py-3 text-sm font-bold text-navy transition hover:bg-brass-bright"
        >
          Apply through Avenor →
        </Link>
      </section>
    </main>
  );
}
