'use client';

import { useState } from 'react';

// Shared submit/busy/error state for the auth forms so sign-in, sign-up, and
// reset all behave the same way.
export function useAuthForm<T>(
  action: (values: T) => Promise<{ error?: string } | void>,
) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(values: T) {
    setBusy(true);
    setError(null);

    const result = await action(values);
    if (result && 'error' in result && result.error) {
      setError(result.error);
      setBusy(false);
      return;
    }

    setDone(true);
    setBusy(false);
  }

  return { submit, busy, error, done, setError };
}
