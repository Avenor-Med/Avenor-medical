import { requireRole } from '@/utils/guard';
import PortalLayout from '@/layouts/PortalLayout';
import { StatCard } from '@/components/ui/Card';

export default async function AdminDashboard() {
  const { name, supabase } = await requireRole('admin');

  const [
    { count: users },
    { count: openJobs },
    { count: resumes },
    { data: auditRecent },
  ] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
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
      .from('audit_log')
      .select('action, entity, occurred_at')
      .order('occurred_at', { ascending: false })
      .limit(15),
  ]);

  return (
    <PortalLayout role="admin" userName={name} title="Admin overview">
      <div className="grid max-w-4xl gap-4 sm:grid-cols-3">
        <StatCard label="Users" value={users ?? 0} />
        <StatCard label="Open positions" value={openJobs ?? 0} />
        <StatCard label="Résumés processed" value={resumes ?? 0} />
      </div>

      <section className="mt-10 max-w-4xl">
        <h2 className="font-serif text-xl text-navy">Audit trail (latest)</h2>
        <div className="mt-4 divide-y divide-slate-200 border border-slate-200 bg-white text-sm">
          {(auditRecent ?? []).map((a, i) => (
            <div key={i} className="flex justify-between px-5 py-3">
              <span className="font-medium text-navy">{a.action}</span>
              <span className="text-slate-400">
                {a.entity ?? ''} · {new Date(a.occurred_at).toLocaleString()}
              </span>
            </div>
          ))}
          {(!auditRecent || auditRecent.length === 0) && (
            <p className="px-5 py-8 text-slate-500">No events recorded yet.</p>
          )}
        </div>
      </section>
    </PortalLayout>
  );
}
