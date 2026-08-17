import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ApplyButton from "./ApplyButton";

export default async function JobDetail({ params }: { params: { id: string } }) {
  const user = await requireUser(["PRACTITIONER"]);
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { facility: true, applications: { where: { practitionerId: user.practitioner!.id } } },
  });
  if (!job) notFound();

  const applied = job.applications.length > 0;
  const approved = user.practitioner!.approvalStatus === "APPROVED";

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/practitioner/jobs" className="text-sm text-brand-600 hover:underline">← All jobs</Link>
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <div className="mt-1 text-sm text-slate-600">{job.facility.name} · {job.city}, {job.state}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="badge bg-slate-100 text-slate-700 border-slate-200">{job.profession}{job.specialty ? ` · ${job.specialty}` : ""}</span>
          <span className="badge bg-emerald-50 text-emerald-700 border-emerald-200">${job.rateUsd}/hr</span>
          {job.shiftType && <span className="badge bg-violet-50 text-violet-700 border-violet-200">{job.shiftType} shift</span>}
          {job.durationWeeks && <span className="badge bg-blue-50 text-blue-700 border-blue-200">{job.durationWeeks} weeks</span>}
          {job.hoursPerWeek && <span className="badge bg-slate-100 text-slate-700 border-slate-200">{job.hoursPerWeek} hrs/wk</span>}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-slate-900">Description</h2>
          <p className="text-slate-700 mt-1 whitespace-pre-line">{job.description}</p>
        </div>
        {job.requirements && (
          <div className="mt-4">
            <h2 className="font-semibold text-slate-900">Requirements</h2>
            <p className="text-slate-700 mt-1 whitespace-pre-line">{job.requirements}</p>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          {applied ? (
            <div className="rounded-md bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 text-sm">
              You've already applied. Track status in <Link href="/practitioner/applications" className="underline">My applications</Link>.
            </div>
          ) : approved ? (
            <ApplyButton jobId={job.id} />
          ) : (
            <div className="rounded-md bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 text-sm">
              Your profile is <strong>{user.practitioner!.approvalStatus.toLowerCase()}</strong>. Once a recruiter approves you, you'll be able to apply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
