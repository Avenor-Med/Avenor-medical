import { Stage, stageLabel, stageColor } from "@/lib/stages";

export function StageBadge({ stage }: { stage: string }) {
  const s = stage as Stage;
  return (
    <span className={`badge ${stageColor[s] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {stageLabel[s] ?? stage}
    </span>
  );
}
