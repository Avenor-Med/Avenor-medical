'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/services/supabase/client';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/account/password`,
    });

    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md border border-brass/30 bg-white p-10 shadow-2xl">
        <h1 className="font-serif text-2xl text-navy">Reset your password</h1>

        {sent ? (
          <p className="mt-4 text-sm text-slate-600">
            If an account exists for <strong>{email}</strong>, a reset link is on
            its way. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-slate-300 px-3 py-2.5 text-sm focus:border-brass focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brass py-3 text-sm font-bold text-navy transition hover:bg-brass-bright"
            >
              Send reset link
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
