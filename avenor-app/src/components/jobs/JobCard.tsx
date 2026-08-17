import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { professionLabel, formatLocation } from '@/utils/format';
import type { JobSummary } from '@/services/jobs.service';

export default function JobCard({ job }: { job: JobSummary }) {
  const duration = job.duration_weeks
    ? `${job.duration_weeks}-week contract`
    : job.job_type;

  return (
    <Link
      href={`/jobs/${encodeURIComponent(job.id)}`}
      className="group flex flex-col border border-slate-200 bg-white p-6 text-navy transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brass-dark">
        {professionLabel(job.profession)}
      </span>

      <h3 className="mt-2 font-serif text-lg leading-snug text-navy">
        {job.title}
      </h3>

      <p className="mt-1 text-sm font-semibold text-slate-600">
        {job.facilities?.name} · {formatLocation(job.city, job.state)}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {[job.shift_type, duration].filter(Boolean).join(' · ')}
      </p>

      {job.visa_support && (
        <div className="mt-3">
          <Badge tone="accent">Visa support</Badge>
        </div>
      )}

      <span className="mt-auto pt-4 text-sm font-bold text-brass-dark group-hover:text-brass">
        View position →
      </span>
    </Link>
  );
}
