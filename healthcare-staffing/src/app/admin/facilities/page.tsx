import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminFacilities() {
  await requireUser(["ADMIN"]);
  const list = await prisma.facility.findMany({
    include: { jobs: true },
    orderBy: { name: "asc" },
  });
  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Facilities</h1>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Name</th><th>Type</th><th>Location</th><th>Contact</th><th className="text-right pr-4">Jobs</th></tr></thead>
          <tbody>
            {list.map((f) => (
              <tr key={f.id}>
                <td className="font-semibold">{f.name}</td>
                <td>{f.type ?? "—"}</td>
                <td>{f.city}, {f.state}</td>
                <td className="text-slate-600 text-xs">{f.contactName ?? "—"}{f.contactEmail ? ` · ${f.contactEmail}` : ""}</td>
                <td className="text-right pr-4 font-mono">{f.jobs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
