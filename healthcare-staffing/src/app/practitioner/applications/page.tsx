import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StageBadge } from "@/components/StageBadge";

export default async function MyApplications() {
  const user = await requireUser(["PRACTITIONER"]);
  const apps = await prisma.application.findMany({
    where: { practitionerId: user.practitioner!.id },
    include: { job: { include: { facility: true } }, events: { orderBy: { occurredAt: "desc" } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My applications</h1>
        <p className="text-slate-600 mt-1">{apps.length} total — track each through the pipeline.</p>
      </div>

      <div className="space-y-4">
        {apps.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/practitioner/jobs/${a.jobId}`} className="font-semibold text-slate-900 hover:underline">{a.job.title}</Link>
                <div className="text-sm text-slate-600 mt-1">{a.job.facility.name} · {a.job.city}, {a.job.state} · ${a.job.rateUsd}/hr</div>
                <div className="mt-2"><StageBadge stage={a.stage} /></div>
                {a.events.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">Pipeline history ({a.events.length} events)</summary>
                    <ul className="mt-2 text-xs text-slate-600 space-y-1 ml-4">
                      {a.events.map((e) => (
                        <li key={e.id}>
                          <span className="font-mono">{new Date(e.occurredAt).toLocaleDateString()}</span> — {e.fromStage ? `${e.fromStage} → ` : ""}{e.toStage}
                          {e.note && <span className="italic"> · "{e.note}"</span>}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap">Applied {new Date(a.appliedAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
        {apps.length === 0 && (
          <div className="card p-8 text-center text-slate-500">
            No applications yet — <Link href="/practitioner/jobs" className="text-brand-600 underline">browse jobs</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
