import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function AdminApplications() {
  await requireUser(["ADMIN"]);
  const apps = await prisma.application.findMany({
    include: {
      practitioner: { include: { user: true } },
      job: { include: { facility: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Practitioner</th><th>Job</th><th>Facility</th><th>Stage</th><th>Applied</th><th>Updated</th></tr></thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id}>
                <td className="font-semibold">{a.practitioner.user.name}</td>
                <td>{a.job.title}</td>
                <td>{a.job.facility.name}</td>
                <td><StageBadge stage={a.stage} /></td>
                <td className="text-slate-500 text-xs">{new Date(a.appliedAt).toLocaleDateString()}</td>
                <td className="text-slate-500 text-xs">{new Date(a.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
