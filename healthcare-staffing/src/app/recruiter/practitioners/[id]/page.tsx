import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ApprovalActions from "./ApprovalActions";

export default async function PractitionerDetail({ params }: { params: { id: string } }) {
  await requireUser(["RECRUITER", "ADMIN"]);
  const p = await prisma.practitioner.findUnique({
    where: { id: params.id },
    include: { user: true, documents: true, certifications: true },
  });
  if (!p) notFound();

  const cv = p.documents.find((d) => d.type === "CV");

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/recruiter/practitioners" className="text-sm text-brand-600 hover:underline">← All practitioners</Link>

      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{p.user.name}</h1>
            <div className="text-sm text-slate-600">{p.user.email}{p.user.phone ? ` · ${p.user.phone}` : ""}</div>
            <span className={`mt-2 inline-block badge ${
              p.approvalStatus === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              p.approvalStatus === "REJECTED" ? "bg-rose-50 text-rose-700 border-rose-200" :
              "bg-amber-50 text-amber-700 border-amber-200"
            }`}>{p.approvalStatus}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <Field label="Profession" v={`${p.profession ?? "—"}${p.specialty ? ` · ${p.specialty}` : ""}`} />
          <Field label="Years experience" v={p.yearsExperience?.toString() ?? "—"} />
          <Field label="License" v={`${p.licenseState ?? "—"} · ${p.licenseNumber ?? "—"}`} />
          <Field label="Rate expectation" v={p.rateExpectationUsd ? `$${p.rateExpectationUsd}/hr` : "—"} />
          <Field label="Location" v={`${p.city ?? "—"}${p.state ? `, ${p.state}` : ""}`} />
          <Field label="Available hrs / wk" v={p.availableHoursPerWk?.toString() ?? "—"} />
        </div>

        {p.aiSummary && (
          <div className="mt-4 bg-brand-50 border border-brand-200 rounded p-3">
            <div className="text-xs font-semibold text-brand-700 mb-1">AI summary (extracted from CV)</div>
            <p className="text-sm text-slate-700">{p.aiSummary}</p>
          </div>
        )}

        {p.bio && (
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Bio</div>
            <p className="text-sm text-slate-700">{p.bio}</p>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-semibold mb-2">Documents</h3>
          {p.documents.length === 0 ? (
            <div className="text-sm text-slate-500">No documents uploaded yet.</div>
          ) : (
            <ul className="space-y-1">
              {p.documents.map((d) => (
                <li key={d.id} className="flex items-center justify-between bg-slate-50 rounded px-3 py-2 text-sm">
                  <span><strong>{d.type}</strong> — {d.fileName}</span>
                  <a href={`/${d.storagePath}`} target="_blank" className="text-brand-600 underline text-xs">view</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {p.certifications.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {p.certifications.map((c) => (
                <span key={c.id} className="badge bg-slate-100 text-slate-700 border-slate-200">{c.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {p.approvalStatus === "PENDING" && (
        <ApprovalActions practitionerId={p.id} hasCv={!!cv} />
      )}
    </div>
  );
}

function Field({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
      <div className="font-semibold text-slate-900">{v}</div>
    </div>
  );
}
