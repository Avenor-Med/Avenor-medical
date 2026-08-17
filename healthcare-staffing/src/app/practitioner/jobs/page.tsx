import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function BrowseJobs() {
  const user = await requireUser(["PRACTITIONER"]);

  const jobs = await prisma.job.findMany({
    where: { status: "OPEN" },
    include: { facility: true, applications: { where: { practitionerId: user.practitioner!.id } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Browse jobs</h1>
        <p className="text-slate-600 mt-1">{jobs.length} open postings.</p>
      </div>

      <div className="grid gap-4">
        {jobs.map((j) => {
          const applied = j.applications.length > 0;
          return (
            <Link key={j.id} href={`/practitioner/jobs/${j.id}`} className="card p-5 hover:border-brand-400 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{j.title}</h3>
                  <div className="text-sm text-slate-600 mt-1">
                    {j.facility.name} · {j.city}, {j.state} · {j.shiftType ?? "—"} · {j.hoursPerWeek ?? "—"} hrs/wk
                    {j.durationWeeks && <> · {j.durationWeeks} weeks</>}
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="badge bg-slate-100 text-slate-700 border-slate-200">{j.profession}{j.specialty ? ` · ${j.specialty}` : ""}</span>
                    <span className="badge bg-emerald-50 text-emerald-700 border-emerald-200">${j.rateUsd}/hr</span>
                    {applied && <span className="badge bg-blue-50 text-blue-700 border-blue-200">Applied</span>}
                  </div>
                </div>
                <div className="text-xs text-slate-500 whitespace-nowrap">{new Date(j.createdAt).toLocaleDateString()}</div>
              </div>
            </Link>
          );
        })}
        {jobs.length === 0 && <div className="card p-8 text-center text-slate-500">No open jobs right now.</div>}
      </div>
    </div>
  );
}
