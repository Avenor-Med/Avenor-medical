import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CsJobsList() {
  await requireUser(["CS"]);
  const jobs = await prisma.job.findMany({
    include: { facility: true, applications: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job postings</h1>
          <p className="text-slate-600 mt-1">{jobs.length} total · {jobs.filter((j) => j.status === "OPEN").length} open</p>
        </div>
        <Link href="/cs/jobs/new" className="btn-primary">+ New job</Link>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Title</th><th>Facility</th><th>Profession</th><th>Rate</th><th>Apps</th><th>Status</th></tr></thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id}>
                <td className="font-semibold">{j.title}</td>
                <td>{j.facility.name} · {j.city}, {j.state}</td>
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
