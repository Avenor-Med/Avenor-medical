import { requireRole } from '@/utils/guard';
import PortalLayout from '@/layouts/PortalLayout';
import { StatCard } from '@/components/ui/Card';

export default async function RecruiterDashboard() {
  const { name, supabase } = await requireRole('recruiter');

  const [{ count: openJobs }, { count: resumeCount }, { data: recent }] =
    await Promise.all([
      supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'open')
        .is('deleted_at', null),
      supabase
        .from('resumes')
        .select('id', { count: 'exact', head: true })
        .is('deleted_at', null),
      supabase
        .from('resumes')
        .select('id, original_filename, status, created_at, parsed_profiles(full_name, profession, specialty)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

  return (
    <PortalLayout role="recruiter" userName={name} title="Recruiter overview">
      <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
        <StatCard label="Open positions" value={openJobs ?? 0} />
        <StatCard label="Candidates in pipeline" value={resumeCount ?? 0} />
        <StatCard label="New this week" value={recent?.length ?? 0} />
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-navy">Recent candidates</h2>
        <div className="mt-4 max-w-4xl divide-y divide-slate-200 border border-slate-200 bg-white">
          {(recent ?? []).map((r) => {
            const p = r.parsed_profiles as unknown as {
              full_name?: string; profession?: string; specialty?: string;
            } | null;
            return (
              <div key={r.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-semibold text-navy">
                    {p?.full_name ?? r.original_filename}
                  </p>
                  <p className="text-sm text-slate-500">
                    {p?.profession ?? '—'} · {p?.specialty ?? 'Pending parse'}
                  </p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brass-dark">
                  {r.status}
                </span>
              </div>
            );
          })}
          {(!recent || recent.length === 0) && (
            <p className="px-5 py-8 text-sm text-slate-500">
              No candidates yet — they appear here as résumés arrive.
            </p>
          )}
        </div>
      </section>
    </PortalLayout>
  );
}
