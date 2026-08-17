import { requireRole } from '@/utils/guard';
import PortalLayout from '@/layouts/PortalLayout';
import { StatCard } from '@/components/ui/Card';

export default async function CsDashboard() {
  const { name, supabase } = await requireRole('cs');

  const [{ count: facilities }, { count: openJobs }, { count: matched }] =
    await Promise.all([
      supabase
        .from('facilities')
        .select('id', { count: 'exact', head: true })
        .is('deleted_at', null),
      supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'open')
        .is('deleted_at', null),
      supabase
        .from('resumes')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'matched')
        .is('deleted_at', null),
    ]);

  return (
    <PortalLayout role="cs" userName={name} title="Customer Success overview">
      <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
        <StatCard label="Partner facilities" value={facilities ?? 0} />
        <StatCard label="Open positions" value={openJobs ?? 0} />
        <StatCard label="Matched candidates" value={matched ?? 0} />
      </div>
      <p className="mt-10 max-w-xl text-sm text-slate-500">
        Pipeline board with credential gating ships in the next release. Until
        then, matched candidates are reviewed from the recruiter overview.
      </p>
    </PortalLayout>
  );
}
