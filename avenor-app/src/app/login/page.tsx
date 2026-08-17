'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseBrowser } from '@/services/supabase/client';

// useSearchParams() forces client-side rendering, so Next.js requires the
// component that reads it to sit inside a Suspense boundary.
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-navy px-4">
          <div className="w-full max-w-md border border-brass/30 bg-white p-10 shadow-2xl">
            <h1 className="font-serif text-2xl text-navy">Sign in to Avenor</h1>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Invalid email or password.');
      setBusy(false);
      return;
    }

    router.push(params.get('next') ?? '/dashboard');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md border border-brass/30 bg-white p-10 shadow-2xl">
        <h1 className="font-serif text-2xl text-navy">Sign in to Avenor</h1>
        <p className="mt-1 text-sm text-slate-500">
          Practitioners, recruiters, and facility partners.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-brass py-3 text-sm font-bold text-navy transition hover:bg-brass-bright disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <a href="/reset-password" className="text-brass hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </main>
  );
}
