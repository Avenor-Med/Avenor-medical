"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewFacility() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", type: "Hospital", city: "", state: "",
    contactName: "", contactEmail: "", contactPhone: "", notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr(null);
    const res = await fetch("/api/facilities", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setErr(d.error || "Save failed"); return; }
    router.push("/cs/facilities");
  }

  function set<K extends keyof typeof form>(k: K, v: any) { setForm({ ...form, [k]: v }); }

  return (
    <div className="max-w-xl space-y-6">
      <Link href="/cs/facilities" className="text-sm text-brand-600 hover:underline">← Facilities</Link>
      <h1 className="text-3xl font-bold text-slate-900">New facility</h1>
      <form className="card p-6 space-y-4" onSubmit={submit}>
        <div><label className="label">Name</label><input className="input" required value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
        <div><label className="label">Type</label>
          <select className="input" value={form.type} onChange={(e) => set("type", e.target.value)}>
            <option>Hospital</option><option>Clinic</option><option>Surgery Center</option><option>SNF</option><option>Home Health</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">City</label><input className="input" required value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
          <div><label className="label">State</label><input className="input" maxLength={2} required value={form.state} onChange={(e) => set("state", e.target.value.toUpperCase())} /></div>
        </div>
        <div><label className="label">Contact name</label><input className="input" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Contact email</label><input className="input" type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} /></div>
          <div><label className="label">Contact phone</label><input className="input" value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} /></div>
        </div>
        <div><label className="label">Notes</label><textarea className="input" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></div>
        {err && <div className="text-sm text-rose-600">{err}</div>}
        <div className="flex justify-end"><button className="btn-primary" disabled={busy}>{busy ? "Saving…" : "Create facility"}</button></div>
      </form>
    </div>
  );
}
