"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileEditor({ practitioner, userName }: { practitioner: any; userName: string }) {
  const router = useRouter();
  const [profession, setProfession]       = useState(practitioner.profession ?? "");
  const [specialty, setSpecialty]         = useState(practitioner.specialty ?? "");
  const [yearsExperience, setYears]       = useState<number | "">(practitioner.yearsExperience ?? "");
  const [licenseNumber, setLicenseNumber] = useState(practitioner.licenseNumber ?? "");
  const [licenseState, setLicenseState]   = useState(practitioner.licenseState ?? "");
  const [city, setCity]                   = useState(practitioner.city ?? "");
  const [state, setState]                 = useState(practitioner.state ?? "");
  const [bio, setBio]                     = useState(practitioner.bio ?? "");
  const [rateExpectationUsd, setRate]     = useState<number | "">(practitioner.rateExpectationUsd ?? "");
  const [availableHoursPerWk, setHours]   = useState<number | "">(practitioner.availableHoursPerWk ?? "");
  const [willingToTravel, setTravel]      = useState<boolean>(!!practitioner.willingToTravel);
  const [aiSummary, setAiSummary]         = useState(practitioner.aiSummary ?? "");
  const [docs, setDocs]                   = useState(practitioner.documents ?? []);
  const [busy, setBusy]                   = useState(false);
  const [aiBusy, setAiBusy]               = useState(false);
  const [aiNote, setAiNote]               = useState<string | null>(null);
  const [msg, setMsg]                     = useState<string | null>(null);

  async function uploadDoc(type: "CV" | "LICENSE" | "CERTIFICATION", file: File) {
    setMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    const res = await fetch("/api/documents", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error || "Upload failed"); return; }
    setDocs((prev: any[]) => [...prev, data.document]);

    // If CV, parse it with Claude
    if (type === "CV") {
      setAiBusy(true);
      setAiNote("AI is reading your CV…");
      const parseRes = await fetch("/api/parse-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: data.document.id }),
      });
      const parsed = await parseRes.json();
      setAiBusy(false);
      if (!parseRes.ok) { setAiNote(parsed.error || "AI parse failed; you can still fill the form manually."); return; }
      // Soft-fill blank fields only
      if (!profession && parsed.profession)             setProfession(parsed.profession);
      if (!specialty && parsed.specialty)               setSpecialty(parsed.specialty);
      if (!yearsExperience && parsed.yearsExperience)   setYears(parsed.yearsExperience);
      if (!licenseState && parsed.licenses?.[0]?.state) setLicenseState(parsed.licenses[0].state);
      if (!licenseNumber && parsed.licenses?.[0]?.number) setLicenseNumber(parsed.licenses[0].number);
      if (parsed.summary) setAiSummary(parsed.summary);
      setAiNote(`Extracted by ${parsed.source === "claude" ? "Claude AI" : "demo mode (no API key set — using mock parser)"}. Review and edit anything that's wrong.`);
    }
  }

  async function save() {
    setBusy(true); setMsg(null);
    const res = await fetch("/api/practitioner/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profession, specialty, yearsExperience: yearsExperience || null,
        licenseNumber, licenseState, city, state, bio,
        rateExpectationUsd: rateExpectationUsd || null,
        availableHoursPerWk: availableHoursPerWk || null,
        willingToTravel, aiSummary,
      }),
    });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setMsg(d.error || "Save failed"); return; }
    setMsg("Saved.");
    router.refresh();
  }

  async function submitForApproval() {
    if (!profession || !licenseState) { setMsg("Profession and license state are required before submitting."); return; }
    if (!docs.find((d: any) => d.type === "CV")) { setMsg("Upload your CV before submitting."); return; }
    setBusy(true); setMsg(null);
    const res = await fetch("/api/practitioner/submit", { method: "POST" });
    setBusy(false);
    if (!res.ok) { const d = await res.json(); setMsg(d.error || "Submit failed"); return; }
    setMsg("Submitted! A recruiter will review your profile.");
    router.refresh();
  }

  const cvDoc = docs.find((d: any) => d.type === "CV");

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My profile</h1>
        <p className="text-slate-600 mt-1">
          Hi {userName.split(" ")[0]} — fill in your profile so recruiters can match you to jobs.
          Status: <span className="font-semibold">{practitioner.approvalStatus}</span>.
        </p>
      </div>

      {/* CV upload + AI parse */}
      <div className="card p-6">
        <h2 className="font-semibold text-slate-900">1. Upload your CV</h2>
        <p className="text-sm text-slate-600 mt-1">Our AI will read it and pre-fill the rest of this form. Edit anything that's wrong before saving.</p>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {cvDoc ? (
            <div className="flex-1 flex items-center justify-between rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm">
              <span className="text-emerald-800">✓ {cvDoc.fileName}</span>
              <a href={`/${cvDoc.storagePath}`} target="_blank" className="text-emerald-700 underline text-xs">view</a>
            </div>
          ) : (
            <label className="btn-secondary cursor-pointer">
              <input type="file" accept=".pdf,.txt,.doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadDoc("CV", f); }} />
              Choose CV file…
            </label>
          )}
          {aiBusy && <span className="text-sm text-slate-600">Analyzing…</span>}
        </div>
        {aiNote && <div className="mt-3 text-xs text-slate-600 bg-slate-50 rounded-md px-3 py-2 border border-slate-200">{aiNote}</div>}
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-slate-900">2. Confirm your profile</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="label">Profession</label>
            <select className="input" value={profession} onChange={(e) => setProfession(e.target.value)}>
              <option value="">— Select —</option>
              <option>RN</option><option>NP</option><option>MD</option><option>PA</option><option>LPN</option><option>Tech</option>
            </select>
          </div>
          <div>
            <label className="label">Specialty</label>
            <input className="input" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="ICU, ER, Family Medicine…" />
          </div>
          <div>
            <label className="label">Years of experience</label>
            <input className="input" type="number" min={0} value={yearsExperience} onChange={(e) => setYears(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Hourly rate expectation (USD)</label>
            <input className="input" type="number" min={0} value={rateExpectationUsd} onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="label">License number</label>
            <input className="input" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
          </div>
          <div>
            <label className="label">License state</label>
            <input className="input" maxLength={2} value={licenseState} onChange={(e) => setLicenseState(e.target.value.toUpperCase())} placeholder="CA" />
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label className="label">State</label>
            <input className="input" maxLength={2} value={state} onChange={(e) => setState(e.target.value.toUpperCase())} />
          </div>
          <div>
            <label className="label">Available hrs / week</label>
            <input className="input" type="number" min={0} max={80} value={availableHoursPerWk} onChange={(e) => setHours(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={willingToTravel} onChange={(e) => setTravel(e.target.checked)} />
              Willing to travel
            </label>
          </div>
          <div className="col-span-2">
            <label className="label">Bio</label>
            <textarea className="input" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          {aiSummary && (
            <div className="col-span-2">
              <label className="label">AI summary <span className="text-slate-400 font-normal normal-case">(shown to recruiters and CS)</span></label>
              <textarea className="input bg-brand-50/50" rows={2} value={aiSummary} onChange={(e) => setAiSummary(e.target.value)} />
            </div>
          )}
        </div>
      </div>

      {/* Other docs */}
      <div className="card p-6">
        <h2 className="font-semibold text-slate-900">3. Upload license & certifications (optional)</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="btn-secondary cursor-pointer">
            <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadDoc("LICENSE", f); }} />
            Upload license
          </label>
          <label className="btn-secondary cursor-pointer">
            <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadDoc("CERTIFICATION", f); }} />
            Upload certification
          </label>
        </div>
        {docs.filter((d: any) => d.type !== "CV").length > 0 && (
          <ul className="mt-3 text-sm text-slate-700 space-y-1">
            {docs.filter((d: any) => d.type !== "CV").map((d: any) => (
              <li key={d.id} className="flex items-center justify-between bg-slate-50 rounded px-3 py-2">
                <span>{d.type} — {d.fileName}</span>
                <a href={`/${d.storagePath}`} target="_blank" className="text-xs text-brand-600 underline">view</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {msg && <div className="rounded-md bg-slate-100 px-4 py-3 text-sm">{msg}</div>}

      <div className="flex items-center justify-between">
        <button onClick={save} className="btn-secondary" disabled={busy}>Save draft</button>
        {practitioner.approvalStatus === "PENDING" && (
          <button onClick={submitForApproval} className="btn-primary" disabled={busy}>
            Submit for approval →
          </button>
        )}
      </div>
    </div>
  );
}
