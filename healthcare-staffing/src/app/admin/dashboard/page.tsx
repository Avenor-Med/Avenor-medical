import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function AdminDashboard() {
  await requireUser(["ADMIN"]);
  const [users, practitioners, facilities, jobs, openJobs, apps, accepted, recent] = await Promise.all([
    prisma.user.count(),
    prisma.practitioner.count(),
    prisma.facility.count(),
    prisma.job.count(),
    prisma.job.count({ where: { status: "OPEN" } }),
    prisma.application.count(),
    prisma.application.count({ where: { stage: "ACCEPTED" } }),
    prisma.pipelineEvent.findMany({
      take: 12, orderBy: { occurredAt: "desc" },
      include: {
        application: { include: { practitioner: { include: { user: true } }, job: { include: { facility: true } } } },
        byUser: true,
      },
    }),
  ]);

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System overview</h1>
        <p className="text-slate-600 mt-1">Full visibility across the platform.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat n={users} label="Users" />
        <Stat n={practitioners} label="Practitioners" />
        <Stat n={facilities} label="Facilities" />
        <Stat n={jobs} label="Total jobs" sub={`${openJobs} open`} />
        <Stat n={apps} label="Applications" />
        <Stat n={accepted} label="Placements" />
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold">Recent pipeline activity</h2>
          <Link href="/admin/applications" className="text-sm text-brand-600 hover:underline">All applications →</Link>
        </div>
        <table className="table">
          <thead><tr><th>When</th><th>Practitioner</th><th>Job</th><th>From → To</th><th>By</th></tr></thead>
          <tbody>
            {recent.map((e) => (
              <tr key={e.id}>
                <td className="text-slate-500 text-xs whitespace-nowrap">{new Date(e.occurredAt).toLocaleString()}</td>
                <td className="font-semibold">{e.application.practitioner.user.name}</td>
                <td>{e.application.job.title} · {e.application.job.facility.name}</td>
                <td className="flex items-center gap-2">
                  {e.fromStage && <StageBadge stage={e.fromStage} />}
                  <span>→</span>
                  <StageBadge stage={e.toStage} />
                </td>
                <td className="text-slate-600">{e.byUser?.name ?? "system"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ n, label, sub }: { n: number; label: string; sub?: string }) {
  return (
    <div className="stat">
      <div className="stat-num">{n}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}
