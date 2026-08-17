import { requireUser } from "@/lib/auth";
import { Shell } from "@/components/Shell";

export default async function CsLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["CS"]);
  return (
    <Shell
      user={user}
      brandLabel="Customer Success"
      navItems={[
        { href: "/cs/dashboard",  label: "Dashboard" },
        { href: "/cs/facilities", label: "Facilities" },
        { href: "/cs/jobs",       label: "Jobs" },
        { href: "/cs/pipeline",   label: "Pipeline" },
      ]}
    >{children}</Shell>
  );
}
