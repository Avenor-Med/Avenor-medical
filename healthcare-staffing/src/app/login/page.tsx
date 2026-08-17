"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(params.get("error") === "unauthorized" ? "You don't have access to that page." : null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setErr(data.error || "Login failed");
      return;
    }
    router.push(data.redirect || "/");
  }

  function fillDemo(e: string) {
    setEmail(e);
    setPassword("password");
  }

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md card p-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">← Back</Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-600">Log in to your account.</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {err && <div className="rounded-md bg-rose-50 text-rose-700 text-sm p-3 border border-rose-200">{err}</div>}
          <button className="btn-primary w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>

        <div className="mt-6 border-t pt-4">
          <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide mb-2">Demo accounts (password: <code>password</code>)</p>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {[
              ["admin@staffing.com", "Admin"],
              ["recruiter@staffing.com", "Recruiter"],
              ["cs@staffing.com", "Customer Success"],
              ["nurse@example.com", "Practitioner — approved"],
              ["doc@example.com", "Practitioner — pending"],
              ["np@example.com", "Practitioner — placed"],
              ["facility@hospital.com", "Facility user"],
            ].map(([e, label]) => (
              <button key={e} type="button" onClick={() => fillDemo(e)} className="flex items-center justify-between text-left rounded-md px-2 py-1.5 hover:bg-slate-100">
                <span className="font-mono text-slate-700">{e}</span>
                <span className="text-slate-500">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          New practitioner? <Link href="/signup" className="font-semibold text-brand-600 hover:underline">Sign up</Link>
        </div>
      </div>
    </main>
  );
}
