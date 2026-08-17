import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface NavItem { href: string; label: string; }

export function Shell({
  user,
  navItems,
  brandLabel,
  children,
}: {
  user: { name: string; email: string; role: string };
  navItems: NavItem[];
  brandLabel: string;
  children: React.ReactNode;
}) {
  const roleLabel: Record<string, string> = {
    ADMIN: "Admin", RECRUITER: "Recruiter", CS: "Customer Success",
    PRACTITIONER: "Practitioner", FACILITY: "Facility",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-7 h-7 rounded-md bg-brand-600 grid place-items-center text-white text-sm">+</div>
            HealthStaff
          </Link>
          <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-600">{brandLabel}</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900 truncate">{user.name}</div>
          <div className="text-xs text-slate-500 truncate">{user.email}</div>
          <div className="text-xs text-slate-500 mt-0.5">{roleLabel[user.role] || user.role}</div>
          <LogoutButton />
        </div>
      </aside>
      <main className="ml-60 p-8">{children}</main>
    </div>
  );
}
