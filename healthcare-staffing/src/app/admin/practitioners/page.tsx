import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPractitioners() {
  await requireUser(["ADMIN"]);
  const list = await prisma.practitioner.findMany({
    include: { user: true, applications: true },
    orderBy: { updatedAt: "desc" },
  });
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Practitioners</h1>
        <p className="text-slate-600 mt-1">{list.length} total.</p>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Name</th><th>Profession</th><th>Status</th><th>Apps</th><th></th></tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td className="font-semibold">{p.user.name}<div className="text-xs text-slate-500">{p.user.email}</div></td>
                <td>{p.profession ?? "—"}{p.specialty ? ` · ${p.specialty}` : ""}</td>
                <td><span className={`badge ${
                  p.approvalStatus === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  p.approvalStatus === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
                  "bg-amber-50 text-amber-700 border-amber-200"
                }`}>{p.approvalStatus}</span></td>
                <td>{p.applications.length}</td>
                <td><Link href={`/recruiter/practitioners/${p.id}`} className="text-brand-600 underline text-sm">Review →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
