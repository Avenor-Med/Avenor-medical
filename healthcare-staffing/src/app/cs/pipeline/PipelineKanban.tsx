"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { STAGES, Stage, stageLabel, stageColor, nextStages } from "@/lib/stages";

interface Job { id: string; title: string; facility: { name: string }; }
interface App {
  id: string; stage: string; appliedAt: string; presentedToFacilityAt: string | null; decisionNote: string | null;
  practitioner: {
    id: string;
    user: { name: string; email: string };
    profession: string | null; specialty: string | null; yearsExperience: number | null;
    licenseState: string | null; rateExpectationUsd: number | null;
    aiSummary: string | null;
    certifications: { id: string; name: string }[];
  };
}

export default function PipelineKanban({
  jobs, applications, selectedJobId,
}: { jobs: Job[]; applications: App[]; selectedJobId: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const stagesShown: Stage[] = ["APPLIED", "UNDER_REVIEW", "PRESENTED", "INTERVIEWING", "ACCEPTED"];

  function appsInStage(s: Stage) {
    return applications.filter((a) => a.stage === s);
  }

  async function move(appId: string, toStage: Stage, note?: string) {
    setBusy(appId);
    const res = await fetch(`/api/applications/${appId}/move`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toStage, note }),
    });
    setBusy(null);
    if (!res.ok) {
      const d = await res.json();
      alert(d.error || "Failed to move");
      return;
    }
    setOpenCard(null);
    setNote("");
    router.refresh();
  }

  function chooseJob(jobId: string) {
    router.push(`/cs/pipeline?jobId=${jobId}`);
  }

  if (jobs.length === 0) {
    return (
      <div className="card p-8 text-center text-slate-500">
        No open jobs yet. <a href="/cs/jobs/new" className="text-brand-600 underline">Create a job</a>.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card p-4 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-slate-700">Job:</span>
        <select className="input max-w-md" value={selectedJobId ?? ""} onChange={(e) => chooseJob(e.target.value)}>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title} — {j.facility.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-slate-500">{applications.length} application{applications.length === 1 ? "" : "s"}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 min-h-[60vh]">
        {stagesShown.map((s) => (
          <div key={s} className="bg-slate-100 rounded-lg p-3 min-h-[300px]">
            <div className="flex items-center justify-between mb-3">
              <span className={`badge ${stageColor[s]}`}>{stageLabel[s]}</span>
              <span className="text-xs text-slate-500">{appsInStage(s).length}</span>
            </div>
            <div className="space-y-2">
              {appsInStage(s).map((a) => {
                const advance = nextStages(s);
                const expanded = openCard === a.id;
                return (
                  <div key={a.id} className={`bg-white rounded-md p-3 border border-slate-200 shadow-sm cursor-pointer ${expanded ? "ring-2 ring-brand-400" : ""}`} onClick={() => setOpenCard(expanded ? null : a.id)}>
                    <div className="font-semibold text-slate-900 text-sm">{a.practitioner.user.name}</div>
                    <div className="text-xs text-slate-600">{a.practitioner.profession ?? "—"}{a.practitioner.specialty ? ` · ${a.practitioner.specialty}` : ""} · {a.practitioner.yearsExperience ?? "—"}y</div>
                    <div className="text-xs text-slate-500 mt-1">{a.practitioner.licenseState ?? "—"} license · ${a.practitioner.rateExpectationUsd ?? "—"}/hr</div>
                    {a.practitioner.certifications.length > 0 && (
                      <div className="mt-1 flex gap-1 flex-wrap">
                        {a.practitioner.certifications.slice(0, 3).map((c) => (
                          <span key={c.id} className="badge bg-slate-50 text-slate-600 border-slate-200 text-[10px]">{c.name}</span>
                        ))}
                      </div>
                    )}
                    {expanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200" onClick={(e) => e.stopPropagation()}>
                        {a.practitioner.aiSummary && (
                          <div className="text-xs text-slate-700 bg-brand-50 rounded p-2 mb-2">
                            <div className="font-semibold text-brand-700 mb-1">AI summary</div>
                            {a.practitioner.aiSummary}
                          </div>
                        )}
                        {advance.length > 0 && (
                          <div className="space-y-2">
                            <input
                              className="input text-xs py-1"
                              placeholder="Note (optional)"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex flex-wrap gap-1">
                              {advance.map((next) => (
                                <button
                                  key={next}
                                  disabled={busy === a.id}
                                  onClick={(e) => { e.stopPropagation(); move(a.id, next, note); }}
                                  className={`text-xs px-2 py-1 rounded font-semibold border ${
                                    next === "REJECTED"
                                      ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                      : "bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100"
                                  }`}
                                >
                                  → {stageLabel[next]}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {appsInStage(s).length === 0 && (
                <div className="text-xs text-slate-400 text-center py-6">—</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 text-sm">
        <strong>Rejected:</strong>{" "}
        {applications.filter((a) => a.stage === "REJECTED").length === 0
          ? <span className="text-slate-500">none</span>
          : applications.filter((a) => a.stage === "REJECTED").map((a) => (
              <span key={a.id} className="badge bg-rose-50 text-rose-700 border-rose-200 mr-2">{a.practitioner.user.name}</span>
            ))}
      </div>
    </div>
  );
}
