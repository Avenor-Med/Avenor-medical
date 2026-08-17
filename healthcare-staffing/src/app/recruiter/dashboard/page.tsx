import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RecruiterDashboard() {
  await requireUser(["RECRUITER"]);
  const [pending, approved, rejected, recent] = await Promise.all([
    prisma.practitioner.count({ where: { approvalStatus: "PENDING" } }),
    prisma.practitioner.count({ where: { approvalStatus: "APPROVED" } }),
    prisma.practitioner.count({ where: { approvalStatus: "REJECTED" } }),
    prisma.practitioner.findMany({
      where: { approvalStatus: "PENDING" }, take: 8,
      include: { user: true, documents: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Recruiter dashboard</h1>
        <p className="text-slate-600 mt-1">Approve practitioners so they can apply to jobs.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="stat"><div className="stat-num">{pending}</div><div className="stat-label">Pending review</div></div>
        <div className="stat"><div className="stat-num">{approved}</div><div className="stat-label">Approved</div></div>
        <div className="stat"><div className="stat-num">{rejected}</div><div className="stat-label">Rejected</div></div>
      </div>
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold">Pending review</h2>
          <Link href="/recruiter/practitioners" className="text-sm text-brand-600 hover:underline">All practitioners →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Nothing pending — you're caught up. 🎉</div>
        ) : (
          <table className="table">
            <thead><tr><th>Name</th><th>Profession</th><th>License</th><th>CV</th><th></th></tr></thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id}>
                  <td className="font-semibold">{p.user.name}</td>
                  <td>{p.profession ?? "—"}{p.specialty ? ` · ${p.specialty}` : ""}</td>
                  <td>{p.licenseState ?? "—"} · {p.licenseNumber ?? "—"}</td>
                  <td>{p.documents.find((d) => d.type === "CV") ? "✓" : "—"}</td>
                  <td><Link href={`/recruiter/practitioners/${p.id}`} className="text-brand-600 underline text-sm">Review →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
