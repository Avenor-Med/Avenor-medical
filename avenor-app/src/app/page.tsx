import Link from 'next/link';
import { countOpenJobs } from '@/services/jobs.service';
import PublicLayout from '@/layouts/PublicLayout';

export const revalidate = 600;

export default async function HomePage() {
  const count = await countOpenJobs();

  return (
    <PublicLayout>
      <section className="bg-navy px-6 py-28 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brass-bright">
          U.S. Licensed · Fully Credentialed · Ready to Practice
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-tight text-cream">
          The most <em className="italic text-brass-bright">credentialed</em>{' '}
          staffing platform in America.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-cream/70">
          Avenor places U.S.-licensed physicians, nurse practitioners, and
          nurses in the nation&rsquo;s finest facilities — every clinician
          verified against a 24-point credentialing standard before day one.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/jobs"
            className="bg-brass px-8 py-3.5 text-sm font-bold text-navy transition hover:bg-brass-bright"
          >
            Browse {count ?? ''} open positions →
          </Link>
          <Link
            href="/signup"
            className="border border-cream/40 px-8 py-3.5 text-sm font-bold text-cream transition hover:border-brass-bright hover:text-brass-bright"
          >
            Create an account
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-3">
        {[
          {
            t: 'Present Your Craft',
            b: 'One elegant profile — license, specialties, shift preferences. Ten minutes, once. We keep it evergreen.',
          },
          {
            t: 'We Verify Everything',
            b: 'NPI, CAQH, DEA, state registries, OIG, SAM, NPDB, immunizations, references — all 24 checks run automatically.',
          },
          {
            t: 'Walk In Ready',
            b: 'Facilities receive a sealed, audit-ready credential file with every match. Offers move in days, not months.',
          },
        ].map((f, i) => (
          <div key={f.t}>
            <p className="font-serif text-4xl text-brass">0{i + 1}</p>
            <h2 className="mt-3 font-serif text-xl text-navy">{f.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.b}</p>
          </div>
        ))}
      </section>

    </PublicLayout>
  );
}
