import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brass-bright">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl text-cream">Page not found</h1>
      <p className="mt-3 max-w-md text-cream/60">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or the position
        has been filled.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-brass-bright"
        >
          Home
        </Link>
        <Link
          href="/jobs"
          className="border border-cream/40 px-6 py-3 text-sm font-bold text-cream transition hover:border-brass-bright hover:text-brass-bright"
        >
          Browse positions
        </Link>
      </div>
    </main>
  );
}
