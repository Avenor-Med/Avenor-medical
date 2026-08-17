import { requireUser } from "@/lib/auth";
import { Shell } from "@/components/Shell";

export default async function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["RECRUITER"]);
  return (
    <Shell
      user={user}
      brandLabel="Recruiter"
      navItems={[
        { href: "/recruiter/dashboard",     label: "Dashboard" },
        { href: "/recruiter/practitioners", label: "Practitioners" },
      ]}
    >{children}</Shell>
  );
}
