import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FacilityJobs() {
  const user = await requireUser(["FACILITY"]);
  if (!user.facilityUser) return <div>No facility linked.</div>;
  const facilityId = user.facilityUser.facilityId;

  const jobs = await prisma.job.findMany({
    where: { facilityId },
    include: {
      applications: {
        where: { stage: { in: ["PRESENTED", "INTERVIEWING", "ACCEPTED"] } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My jobs</h1>
        <p className="text-slate-600 mt-1">{jobs.length} jobs at your facility.</p>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Title</th><th>Profession</th><th>Rate</th><th>Visible candidates</th><th>Status</th></tr></thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id}>
                <td className="font-semibold">{j.title}</td>
                <td>{j.profession}{j.specialty ? ` · ${j.specialty}` : ""}</td>
                <td>${j.rateUsd}/hr</td>
                <td>{j.applications.length}</td>
                <td><span className={`badge ${j.status === "OPEN" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-700 border-slate-200"}`}>{j.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
