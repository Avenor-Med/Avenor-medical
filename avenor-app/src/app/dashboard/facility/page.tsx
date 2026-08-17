import { requireRole } from '@/utils/guard';
import PortalLayout from '@/layouts/PortalLayout';
import { StatCard } from '@/components/ui/Card';

export default async function FacilityDashboard() {
  const { name, supabase } = await requireRole('facility');

  const { count: openJobs } = await supabase
    .from('jobs')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'open')
    .is('deleted_at', null);

  return (
    <PortalLayout role="facility" userName={name} title="Facility overview">
      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        <StatCard label="Open positions (network-wide)" value={openJobs ?? 0} />
        <StatCard label="Presented candidates" value={0} />
      </div>
      <p className="mt-10 max-w-xl text-sm text-slate-500">
        Candidates appear here only after Customer Success formally presents
        them — every one has cleared the full 24-point credentialing checklist.
        You never browse the open practitioner pool.
      </p>
    </PortalLayout>
  );
}
