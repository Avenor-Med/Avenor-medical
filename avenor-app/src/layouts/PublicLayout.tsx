import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/constants/config';

// Shell for the marketing site and job board — everything a signed-out
// visitor sees.
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-brass/20 bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-lg tracking-wide text-cream">
            {SITE.name}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/jobs" className="text-cream/80 hover:text-brass-bright">
              Search Jobs
            </Link>
            <Link href="/login" className="text-cream/80 hover:text-brass-bright">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-brass px-5 py-2 text-xs font-bold text-navy transition hover:bg-brass-bright"
            >
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-serif text-lg text-navy">{SITE.name}</p>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Nationwide healthcare staffing. Every clinician verified against a
            24-point credentialing standard.
          </p>
        </div>

        <nav className="flex gap-12 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Clinicians
            </p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/jobs" className="text-slate-600 hover:text-brass-dark">Browse positions</Link></li>
              <li><Link href="/signup" className="text-slate-600 hover:text-brass-dark">Create account</Link></li>
              <li><Link href="/login" className="text-slate-600 hover:text-brass-dark">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Company
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-slate-600 hover:text-brass-dark">
                  Contact
                </a>
              </li>
              <li><Link href="/legal/privacy" className="text-slate-600 hover:text-brass-dark">Privacy</Link></li>
              <li><Link href="/legal/terms" className="text-slate-600 hover:text-brass-dark">Terms</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-5xl text-xs text-slate-400">
        © {new Date().getFullYear()} {SITE.legalName} · All rights reserved
      </p>
    </footer>
  );
}
