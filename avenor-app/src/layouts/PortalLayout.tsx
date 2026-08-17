import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/constants/config';
import type { Role } from '@/constants/roles';

// Shell shared by every signed-in portal. Navigation is derived from role, so
// a nurse can never be rendered a facility or admin menu.
const PORTAL_NAV: Record<Role, { href: string; label: string }[]> = {
  practitioner: [
    { href: '/dashboard/practitioner', label: 'Overview' },
    { href: '/jobs', label: 'Browse Jobs' },
  ],
  recruiter: [
    { href: '/dashboard/recruiter', label: 'Overview' },
    { href: '/jobs', label: 'Job Board' },
  ],
  cs: [{ href: '/dashboard/cs', label: 'Overview' }],
  facility: [{ href: '/dashboard/facility', label: 'Overview' }],
  admin: [
    { href: '/dashboard/admin', label: 'Overview' },
    { href: '/jobs', label: 'Job Board' },
  ],
};

const PORTAL_LABEL: Record<Role, string> = {
  practitioner: 'Clinician Portal',
  recruiter: 'Recruiter Portal',
  cs: 'Customer Success',
  facility: 'Facility Portal',
  admin: 'Administration',
};

export default function PortalLayout({
  role,
  userName,
  title,
  children,
}: {
  role: Role;
  userName: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 bg-navy px-5 py-8 text-cream">
        <p className="font-serif text-lg tracking-wide">{SITE.name}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-wider text-brass-bright">
          {PORTAL_LABEL[role]}
        </p>
        <p className="mt-4 text-xs text-cream/60">{userName}</p>

        <nav className="mt-8 space-y-1">
          {PORTAL_NAV[role].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm text-cream/80 transition hover:bg-white/5 hover:text-brass-bright"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/api/auth/signout" method="post" className="mt-10">
          <button className="px-3 py-2 text-xs text-cream/50 transition hover:text-cream">
            Sign out
          </button>
        </form>
      </aside>

      <main className="flex-1 bg-cream-soft px-10 py-10">
        <h1 className="font-serif text-3xl text-navy">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
