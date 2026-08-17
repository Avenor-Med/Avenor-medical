import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function FacilityCandidates() {
  const user = await requireUser(["FACILITY"]);
  if (!user.facilityUser) return <div>No facility linked to this account.</div>;
  const facilityId = user.facilityUser.facilityId;

  // Facilities NEVER see APPLIED or UNDER_REVIEW — only PRESENTED+ for their own jobs.
  const apps = await prisma.application.findMany({
    where: {
      stage: { in: ["PRESENTED", "INTERVIEWING", "ACCEPTED", "REJECTED"] },
      job: { facilityId },
    },
    include: { practitioner: { include: { user: true, certifications: true } }, job: true },
    orderBy: { presentedToFacilityAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Presented candidates</h1>
        <p className="text-slate-600 mt-1">{apps.length} candidates our team has shortlisted for your facility.</p>
        <div className="mt-3 rounded-md bg-blue-50 border border-blue-200 px-4 py-2 text-sm text-blue-900">
          ℹ️ You see only candidates that Customer Success has formally presented. The open practitioner pool is not browseable — this is by design.
        </div>
      </div>

      <div className="space-y-4">
        {apps.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-slate-900">{a.practitioner.user.name}</h3>
                  <StageBadge stage={a.stage} />
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {a.practitioner.profession ?? "—"}{a.practitioner.specialty ? ` · ${a.practitioner.specialty}` : ""} · {a.practitioner.yearsExperience ?? "—"} yrs
                  · {a.practitioner.licenseState ?? "—"} license
                </div>
                <div className="text-sm text-slate-600 mt-0.5">
                  Applied for: <strong>{a.job.title}</strong> ({a.job.city}, {a.job.state})
                </div>
                {a.practitioner.certifications.length > 0 && (
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {a.practitioner.certifications.map((c) => (
                      <span key={c.id} className="badge bg-slate-50 text-slate-600 border-slate-200 text-[10px]">{c.name}</span>
                    ))}
                  </div>
                )}
                {a.practitioner.aiSummary && (
                  <div className="mt-3 bg-brand-50 border border-brand-200 rounded p-3">
                    <div className="text-xs font-semibold text-brand-700 mb-1">Recruiter notes</div>
                    <p className="text-sm text-slate-700">{a.practitioner.aiSummary}</p>
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-500 whitespace-nowrap">
                {a.presentedToFacilityAt && (
                  <>Presented<br/>{new Date(a.presentedToFacilityAt).toLocaleDateString()}</>
                )}
              </div>
            </div>
          </div>
        ))}
        {apps.length === 0 && (
          <div className="card p-8 text-center text-slate-500">No presented candidates yet.</div>
        )}
      </div>
    </div>
  );
}
