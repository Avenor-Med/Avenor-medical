import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminUsers() {
  await requireUser(["ADMIN"]);
  const users = await prisma.user.findMany({ orderBy: [{ role: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-600 mt-1">{users.length} accounts across all roles.</p>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>Created</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-semibold">{u.name}</td>
                <td>{u.email}</td>
                <td><span className="badge bg-slate-100 text-slate-700 border-slate-200">{u.role}</span></td>
                <td>{u.active ? "✓" : "—"}</td>
                <td className="text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
