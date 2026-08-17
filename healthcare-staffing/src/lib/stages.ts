// Pipeline stage helpers — single source of truth for stage labels and ordering.
export const STAGES = [
  "APPLIED",
  "UNDER_REVIEW",
  "PRESENTED",
  "INTERVIEWING",
  "ACCEPTED",
  "REJECTED",
] as const;

export type Stage = typeof STAGES[number];

export const stageLabel: Record<Stage, string> = {
  APPLIED:      "Applied",
  UNDER_REVIEW: "Under Review",
  PRESENTED:    "Presented to Facility",
  INTERVIEWING: "Interviewing",
  ACCEPTED:     "Accepted",
  REJECTED:     "Rejected",
};

export const stageColor: Record<Stage, string> = {
  APPLIED:      "bg-slate-100 text-slate-700 border-slate-200",
  UNDER_REVIEW: "bg-amber-100 text-amber-800 border-amber-200",
  PRESENTED:    "bg-blue-100 text-blue-800 border-blue-200",
  INTERVIEWING: "bg-violet-100 text-violet-800 border-violet-200",
  ACCEPTED:     "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED:     "bg-rose-100 text-rose-800 border-rose-200",
};

// Stages CS can advance an application to FROM a given stage.
// Facilities don't browse the open pool — they only see PRESENTED+.
export function nextStages(current: Stage): Stage[] {
  switch (current) {
    case "APPLIED":      return ["UNDER_REVIEW", "REJECTED"];
    case "UNDER_REVIEW": return ["PRESENTED", "REJECTED"];
    case "PRESENTED":    return ["INTERVIEWING", "REJECTED"];
    case "INTERVIEWING": return ["ACCEPTED", "REJECTED"];
    default: return [];
  }
}

export function isVisibleToFacility(stage: Stage): boolean {
  return ["PRESENTED", "INTERVIEWING", "ACCEPTED"].includes(stage);
}
