import { requireUser } from "@/lib/auth";
import { Shell } from "@/components/Shell";

export default async function PractitionerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["PRACTITIONER"]);
  return (
    <Shell
      user={user}
      brandLabel="Practitioner"
      navItems={[
        { href: "/practitioner/dashboard",    label: "Dashboard" },
        { href: "/practitioner/profile",      label: "My profile" },
        { href: "/practitioner/jobs",         label: "Browse jobs" },
        { href: "/practitioner/applications", label: "My applications" },
      ]}
    >{children}</Shell>
  );
}
