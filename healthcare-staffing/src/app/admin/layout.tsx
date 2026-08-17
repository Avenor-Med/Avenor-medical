import { requireUser } from "@/lib/auth";
import { Shell } from "@/components/Shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["ADMIN"]);
  return (
    <Shell
      user={user}
      brandLabel="Admin"
      navItems={[
        { href: "/admin/dashboard",     label: "Overview" },
        { href: "/admin/users",         label: "Users" },
        { href: "/admin/practitioners", label: "Practitioners" },
        { href: "/admin/facilities",    label: "Facilities" },
        { href: "/admin/jobs",          label: "Jobs" },
        { href: "/admin/applications",  label: "Applications" },
      ]}
    >{children}</Shell>
  );
}
