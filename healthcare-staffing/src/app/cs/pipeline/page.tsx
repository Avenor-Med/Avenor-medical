import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PipelineKanban from "./PipelineKanban";

export default async function PipelinePage({ searchParams }: { searchParams: { jobId?: string } }) {
  await requireUser(["CS"]);

  const jobs = await prisma.job.findMany({
    where: { status: "OPEN" },
    include: { facility: true, applications: true },
    orderBy: { createdAt: "desc" },
  });

  const selectedJobId = searchParams.jobId || jobs[0]?.id || null;

  const applications = selectedJobId
    ? await prisma.application.findMany({
        where: { jobId: selectedJobId },
        include: {
          practitioner: { include: { user: true, certifications: true } },
          job: { include: { facility: true } },
        },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Pipeline</h1>
        <p className="text-slate-600 mt-1">Move applicants through the stages — facilities only see candidates you've presented.</p>
      </div>
      <PipelineKanban
        jobs={JSON.parse(JSON.stringify(jobs))}
        applications={JSON.parse(JSON.stringify(applications))}
        selectedJobId={selectedJobId}
      />
    </div>
  );
}
