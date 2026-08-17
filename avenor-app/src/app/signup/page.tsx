'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/services/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy px-4">
        <div className="w-full max-w-md border border-brass/30 bg-white p-10 text-center shadow-2xl">
          <h1 className="font-serif text-2xl text-navy">Check your email</h1>
          <p className="mt-3 text-sm text-slate-600">
            We sent a verification link to <strong>{email}</strong>. Click it to
            activate your account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md border border-brass/30 bg-white p-10 shadow-2xl">
        <h1 className="font-serif text-2xl text-navy">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Practitioners start here. Facility and recruiter accounts are provisioned
          by our team.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Full name
            </label>
            <input
              id="name"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
            />
          </div>
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
              minLength={10}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-slate-300 px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
            />
            <p className="mt-1 text-xs text-slate-400">Minimum 10 characters.</p>
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-brass py-3 text-sm font-bold text-navy transition hover:bg-brass-bright disabled:opacity-60"
          >
            {busy ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{' '}
          <a href="/login" className="text-brass hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
