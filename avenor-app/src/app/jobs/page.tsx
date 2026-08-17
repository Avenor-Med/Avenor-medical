import PublicLayout from '@/layouts/PublicLayout';
import JobGrid from '@/components/jobs/JobGrid';
import { listOpenJobs } from '@/services/jobs.service';

export const revalidate = 300;

type Search = { state?: string; specialty?: string; profession?: string; page?: string };

export default async function JobsPage({ searchParams }: { searchParams: Search }) {
  const { jobs, total, page, totalPages } = await listOpenJobs({
    state: searchParams.state,
    specialty: searchParams.specialty,
    profession: searchParams.profession,
    page: parseInt(searchParams.page ?? '1', 10) || 1,
  });

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass-dark">
            Now Casting
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">
            Open positions across the country
          </h1>
          <p className="mt-2 text-slate-500">
            {total} open roles · every placement fully credentialed before day one
          </p>
        </header>
        <JobGrid jobs={jobs} page={page} totalPages={totalPages} />
      </div>
    </PublicLayout>
  );
}
