import { requireUser } from "@/lib/auth";
import { Shell } from "@/components/Shell";

export default async function FacilityLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["FACILITY"]);
  return (
    <Shell
      user={user}
      brandLabel="Facility"
      navItems={[
        { href: "/facility/dashboard",  label: "Dashboard" },
        { href: "/facility/candidates", label: "Presented candidates" },
        { href: "/facility/jobs",       label: "My jobs" },
      ]}
    >{children}</Shell>
  );
}
