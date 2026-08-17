'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vercel captures this; wire Sentry here when the DSN is configured.
    console.error('Application error:', error.digest ?? error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <h1 className="font-serif text-3xl text-cream">Something went wrong</h1>
      <p className="mt-3 max-w-md text-cream/60">
        We&rsquo;ve logged the problem. Try again, or contact us at{' '}
        <a href="mailto:info@avenormedical.com" className="text-brass-bright">
          info@avenormedical.com
        </a>
        .
      </p>
      <button
        onClick={reset}
        className="mt-8 bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-brass-bright"
      >
        Try again
      </button>
    </main>
  );
}
