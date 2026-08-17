"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApprovalActions({ practitionerId, hasCv }: { practitionerId: string; hasCv: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true); setErr(null);
    const res = await fetch(`/api/practitioners/${practitionerId}/decision`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approve, note: note || null }),
    });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setErr(d.error || "Failed"); return; }
    router.refresh();
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-slate-900">Approval decision</h3>
      {!hasCv && (
        <div className="mt-2 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm p-3">
          Practitioner hasn't uploaded a CV yet. You can still approve, but it's worth following up.
        </div>
      )}
      <div className="mt-3">
        <label className="label">Note (optional)</label>
        <textarea className="input" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reasoning, follow-up needed, etc." />
      </div>
      {err && <div className="mt-2 text-sm text-rose-600">{err}</div>}
      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={() => decide(false)} disabled={busy} className="btn-danger">Reject</button>
        <button onClick={() => decide(true)} disabled={busy} className="btn-primary">Approve</button>
      </div>
    </div>
  );
}
