import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function CsDashboard() {
  await requireUser(["CS"]);
  const [openJobs, totalApps, pending, presented, accepted, recent] = await Promise.all([
    prisma.job.count({ where: { status: "OPEN" } }),
    prisma.application.count(),
    prisma.application.count({ where: { stage: { in: ["APPLIED", "UNDER_REVIEW"] } } }),
    prisma.application.count({ where: { stage: "PRESENTED" } }),
    prisma.application.count({ where: { stage: "ACCEPTED" } }),
    prisma.application.findMany({
      take: 8, orderBy: { updatedAt: "desc" },
      include: { practitioner: { include: { user: true } }, job: { include: { facility: true } } },
    }),
  ]);

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customer Success dashboard</h1>
          <p className="text-slate-600 mt-1">The operator console — manage facilities, jobs, and the applicant pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/cs/jobs/new" className="btn-primary">+ New job</Link>
          <Link href="/cs/facilities/new" className="btn-secondary">+ New facility</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="stat"><div className="stat-num">{openJobs}</div><div className="stat-label">Open jobs</div></div>
        <div className="stat"><div className="stat-num">{totalApps}</div><div className="stat-label">Applications</div></div>
        <div className="stat"><div className="stat-num">{pending}</div><div className="stat-label">Need review</div></div>
        <div className="stat"><div className="stat-num">{presented}</div><div className="stat-label">Presented</div></div>
        <div className="stat"><div className="stat-num">{accepted}</div><div className="stat-label">Placements</div></div>
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent activity</h2>
          <Link href="/cs/pipeline" className="text-sm text-brand-600 hover:underline">Open pipeline →</Link>
        </div>
        <table className="table">
          <thead><tr><th>Practitioner</th><th>Job</th><th>Facility</th><th>Stage</th><th>Updated</th></tr></thead>
          <tbody>
            {recent.map((a) => (
              <tr key={a.id}>
                <td className="font-semibold">{a.practitioner.user.name}</td>
                <td>{a.job.title}</td>
                <td>{a.job.facility.name}</td>
                <td><StageBadge stage={a.stage} /></td>
                <td className="text-slate-500">{new Date(a.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
