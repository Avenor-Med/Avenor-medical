import Link from 'next/link';
import JobCard from './JobCard';
import type { JobSummary } from '@/services/jobs.service';

export default function JobGrid({
  jobs,
  page,
  totalPages,
  basePath = '/jobs',
}: {
  jobs: JobSummary[];
  page: number;
  totalPages: number;
  basePath?: string;
}) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-4 text-sm">
          {page > 1 && (
            <Link
              href={`${basePath}?page=${page - 1}`}
              className="text-brass-dark hover:underline"
            >
              ← Previous
            </Link>
          )}
          <span className="text-slate-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`${basePath}?page=${page + 1}`}
              className="text-brass-dark hover:underline"
            >
              Next →
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
