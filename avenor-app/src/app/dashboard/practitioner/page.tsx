import Link from 'next/link';
import PortalLayout from '@/layouts/PortalLayout';
import { StatCard } from '@/components/ui/Card';
import ResumeUploader from '@/components/resume/ResumeUploader';
import { requireRole } from '@/utils/guard';
import { formatLocation } from '@/utils/format';

export default async function PractitionerPortal() {
  const { user, name, supabase } = await requireRole('practitioner');

  const { data: resumes } = await supabase
    .from('resumes')
    .select('id, original_filename, status, created_at')
    .eq('owner_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(5);

  const latest = resumes?.[0];
  const { data: matches } = latest
    ? await supabase
        .from('job_matches')
        .select('match_pct, jobs(id, title, city, state, job_type, facilities(name))')
        .eq('resume_id', latest.id)
        .order('match_pct', { ascending: false })
        .limit(10)
    : { data: null };

  return (
    <PortalLayout role="practitioner" userName={name} title="Your dashboard">
      <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
        <StatCard label="Résumés on file" value={resumes?.length ?? 0} />
        <StatCard label="Matches found" value={matches?.length ?? 0} />
        <StatCard label="Latest status" value={latest?.status ?? '—'} />
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-xl text-navy">Upload your résumé</h2>
        <p className="mt-1 text-sm text-slate-500">
          PDF, DOCX, or TXT. Our AI reads it and finds your best-fit positions.
        </p>
        <div className="mt-4"><ResumeUploader /></div>
      </section>

      {matches && matches.length > 0 && (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-serif text-xl text-navy">Your top matches</h2>
          <div className="mt-4 divide-y divide-slate-200 border border-slate-200 bg-white">
            {matches.map((m, i) => {
              const job = m.jobs as unknown as {
                id: string; title: string; city: string; state: string;
                job_type: string; facilities: { name: string } | null;
              };
              return (
                <Link
                  key={i}
                  href={`/jobs/${encodeURIComponent(job.id)}`}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-cream-soft"
                >
                  <div>
                    <p className="font-semibold text-navy">{job.title}</p>
                    <p className="text-sm text-slate-500">
                      {job.facilities?.name} · {formatLocation(job.city, job.state)} · {job.job_type}
                    </p>
                  </div>
                  <span className="font-serif text-lg text-brass-dark">{m.match_pct}%</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </PortalLayout>
  );
}
