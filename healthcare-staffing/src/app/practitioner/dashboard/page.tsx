import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function PractitionerDashboard() {
  const user = await requireUser(["PRACTITIONER"]);
  const practitioner = await prisma.practitioner.findUnique({
    where: { userId: user.id },
    include: {
      applications: {
        include: { job: { include: { facility: true } } },
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  if (!practitioner) return null;

  const apps = practitioner.applications;
  const accepted = apps.filter((a) => a.stage === "ACCEPTED");
  const earningsToDate = accepted.reduce(
    (sum, a) => sum + (a.hoursLogged * (a.job.rateUsd ?? 0)),
    0
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name.split(" ")[0]}</h1>
          <p className="text-slate-600 mt-1">Track your applications and earnings.</p>
        </div>
        <Link href="/practitioner/jobs" className="btn-primary">Browse jobs</Link>
      </div>

      {practitioner.approvalStatus !== "APPROVED" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <strong>Profile {practitioner.approvalStatus.toLowerCase()}.</strong>{" "}
          {practitioner.approvalStatus === "PENDING"
            ? "Complete your profile and upload your CV — a recruiter will review and approve you shortly."
            : "Your profile was rejected. Reach out to the recruiting team."}
          <div className="mt-2"><Link href="/practitioner/profile" className="underline font-semibold">Go to my profile →</Link></div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat"><div className="stat-num">{apps.length}</div><div className="stat-label">Applications</div></div>
        <div className="stat"><div className="stat-num">{apps.filter((a) => ["UNDER_REVIEW", "PRESENTED", "INTERVIEWING"].includes(a.stage)).length}</div><div className="stat-label">In progress</div></div>
        <div className="stat"><div className="stat-num">{accepted.length}</div><div className="stat-label">Accepted</div></div>
        <div className="stat"><div className="stat-num">${earningsToDate.toFixed(0)}</div><div className="stat-label">Earnings to date</div></div>
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent applications</h2>
          <Link href="/practitioner/applications" className="text-sm text-brand-600 hover:underline">See all →</Link>
        </div>
        {apps.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No applications yet. <Link href="/practitioner/jobs" className="text-brand-600 underline">Browse jobs</Link>.
          </div>
        ) : (
          <table className="table">
            <thead><tr><th>Job</th><th>Facility</th><th>Stage</th><th>Applied</th></tr></thead>
            <tbody>
              {apps.slice(0, 5).map((a) => (
                <tr key={a.id}>
                  <td className="font-semibold text-slate-900">{a.job.title}</td>
                  <td>{a.job.facility.name}</td>
                  <td><StageBadge stage={a.stage} /></td>
                  <td className="text-slate-500">{new Date(a.appliedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {accepted.length > 0 && (
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Earnings (display only — payments are out of MVP scope)</h2>
          </div>
          <table className="table">
            <thead><tr><th>Job</th><th>Facility</th><th>Rate</th><th>Hours logged</th><th className="text-right pr-4">Earnings</th></tr></thead>
            <tbody>
              {accepted.map((a) => (
                <tr key={a.id}>
                  <td className="font-semibold">{a.job.title}</td>
                  <td>{a.job.facility.name}</td>
                  <td>${a.job.rateUsd}/hr</td>
                  <td>{a.hoursLogged}</td>
                  <td className="text-right pr-4 font-semibold">${(a.hoursLogged * a.job.rateUsd).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
