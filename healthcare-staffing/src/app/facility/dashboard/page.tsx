import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";
import { isVisibleToFacility, Stage } from "@/lib/stages";

export default async function FacilityDashboard() {
  const user = await requireUser(["FACILITY"]);
  if (!user.facilityUser) return <div>No facility linked to this account.</div>;
  const facilityId = user.facilityUser.facilityId;

  const [jobs, presentedApps, activePlacements] = await Promise.all([
    prisma.job.findMany({ where: { facilityId }, orderBy: { createdAt: "desc" } }),
    prisma.application.findMany({
      where: { stage: { in: ["PRESENTED", "INTERVIEWING", "ACCEPTED"] }, job: { facilityId } },
      include: { practitioner: { include: { user: true, certifications: true } }, job: true },
      orderBy: { presentedToFacilityAt: "desc" },
    }),
    prisma.application.findMany({
      where: { stage: "ACCEPTED", job: { facilityId } },
      include: { practitioner: { include: { user: true } }, job: true },
    }),
  ]);

  // Spend = sum of (rate × hours_logged) across accepted placements
  const spendToDate = activePlacements.reduce(
    (sum, a) => sum + a.hoursLogged * (a.job.rateUsd ?? 0),
    0
  );

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.facilityUser.facility.name}</h1>
        <p className="text-slate-600 mt-1">You see only the candidates our team has presented to you. CS controls all matching.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat"><div className="stat-num">{jobs.filter((j) => j.status === "OPEN").length}</div><div className="stat-label">Open jobs</div></div>
        <div className="stat"><div className="stat-num">{presentedApps.filter((a) => a.stage === "PRESENTED").length}</div><div className="stat-label">Presented</div></div>
        <div className="stat"><div className="stat-num">{activePlacements.length}</div><div className="stat-label">Active placements</div></div>
        <div className="stat"><div className="stat-num">${spendToDate.toFixed(0)}</div><div className="stat-label">Spend to date</div></div>
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Presented candidates</h2>
          <Link href="/facility/candidates" className="text-sm text-brand-600 hover:underline">All →</Link>
        </div>
        {presentedApps.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No candidates presented yet — check back soon.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Candidate</th><th>For</th><th>Profession</th><th>Stage</th><th>Presented</th></tr></thead>
            <tbody>
              {presentedApps.slice(0, 6).map((a) => (
                <tr key={a.id}>
                  <td className="font-semibold">{a.practitioner.user.name}</td>
                  <td>{a.job.title}</td>
                  <td>{a.practitioner.profession ?? "—"}{a.practitioner.specialty ? ` · ${a.practitioner.specialty}` : ""}</td>
                  <td><StageBadge stage={a.stage} /></td>
                  <td className="text-slate-500">{a.presentedToFacilityAt ? new Date(a.presentedToFacilityAt).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {activePlacements.length > 0 && (
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Active practitioners — spend tracking</h2>
          </div>
          <table className="table">
            <thead><tr><th>Practitioner</th><th>Job</th><th>Rate</th><th>Hours</th><th className="text-right pr-4">Spend</th></tr></thead>
            <tbody>
              {activePlacements.map((a) => (
                <tr key={a.id}>
                  <td className="font-semibold">{a.practitioner.user.name}</td>
                  <td>{a.job.title}</td>
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
