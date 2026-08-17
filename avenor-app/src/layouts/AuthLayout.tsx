import type { ReactNode } from 'react';
import { SITE } from '@/constants/config';

// Centered card shell for sign-in, sign-up, and password reset.
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md border border-brass/30 bg-white p-10 shadow-2xl">
        <p className="font-serif text-sm tracking-wide text-brass-dark">
          {SITE.name}
        </p>
        <h1 className="mt-2 font-serif text-2xl text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}

        <div className="mt-8">{children}</div>

        {footer && (
          <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
        )}
      </div>
    </main>
  );
}
