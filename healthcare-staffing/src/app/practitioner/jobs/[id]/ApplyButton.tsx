"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function apply() {
    setBusy(true); setErr(null);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setErr(d.error || "Apply failed"); return; }
    router.push("/practitioner/applications");
  }

  return (
    <div>
      <button onClick={apply} disabled={busy} className="btn-primary">
        {busy ? "Applying…" : "Apply to this job"}
      </button>
      {err && <div className="mt-2 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
