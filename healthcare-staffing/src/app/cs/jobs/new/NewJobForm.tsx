"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobForm({ facilities }: { facilities: { id: string; name: string }[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    facilityId: facilities[0]?.id ?? "",
    title: "", profession: "RN", specialty: "",
    city: "", state: "",
    shiftType: "Day", hoursPerWeek: 36, durationWeeks: 13,
    rateUsd: 80, description: "", requirements: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: any) { setForm({ ...form, [k]: v }); }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr(null);
    const res = await fetch("/api/jobs", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setErr(d.error || "Save failed"); return; }
    router.push("/cs/jobs");
  }

  return (
    <form className="card p-6 space-y-4" onSubmit={submit}>
      <div>
        <label className="label">Facility</label>
        <select className="input" required value={form.facilityId} onChange={(e) => set("facilityId", e.target.value)}>
          {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>
      <div><label className="label">Title</label><input className="input" required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="ICU Travel Nurse — 13-week" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Profession</label>
          <select className="input" value={form.profession} onChange={(e) => set("profession", e.target.value)}>
            <option>RN</option><option>NP</option><option>MD</option><option>PA</option><option>LPN</option><option>Tech</option>
          </select>
        </div>
        <div><label className="label">Specialty</label><input className="input" value={form.specialty} onChange={(e) => set("specialty", e.target.value)} placeholder="ICU" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">City</label><input className="input" required value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
        <div><label className="label">State</label><input className="input" maxLength={2} required value={form.state} onChange={(e) => set("state", e.target.value.toUpperCase())} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="label">Shift</label>
          <select className="input" value={form.shiftType} onChange={(e) => set("shiftType", e.target.value)}>
            <option>Day</option><option>Night</option><option>Rotating</option>
          </select>
        </div>
        <div><label className="label">Hours / week</label><input className="input" type="number" value={form.hoursPerWeek} onChange={(e) => set("hoursPerWeek", Number(e.target.value))} /></div>
        <div><label className="label">Duration (wks)</label><input className="input" type="number" value={form.durationWeeks} onChange={(e) => set("durationWeeks", Number(e.target.value))} /></div>
      </div>
      <div><label className="label">Hourly rate (USD)</label><input className="input" type="number" min={0} required value={form.rateUsd} onChange={(e) => set("rateUsd", Number(e.target.value))} /></div>
      <div><label className="label">Description</label><textarea className="input" rows={4} required value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className="label">Requirements</label><textarea className="input" rows={3} value={form.requirements} onChange={(e) => set("requirements", e.target.value)} placeholder="• 2+ yrs ICU&#10;• BLS, ACLS&#10;• CA license required" /></div>
      {err && <div className="text-sm text-rose-600">{err}</div>}
      <div className="flex justify-end"><button className="btn-primary" disabled={busy}>{busy ? "Saving…" : "Create job"}</button></div>
    </form>
  );
}
