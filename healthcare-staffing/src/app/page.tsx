import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, dashboardPathForRole } from "@/lib/auth";

export default async function Home() {
  const u = await getSessionUser();
  if (u) redirect(dashboardPathForRole(u.role));

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 rounded-md bg-brand-600 grid place-items-center text-white text-sm">+</div>
            HealthStaff
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">Log in</Link>
            <Link href="/signup" className="btn-primary">Get started</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">MVP Prototype</span>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
              Controlled healthcare staffing —<br/>built for your team.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Onboard practitioners, post jobs, run the applicant pipeline, and present pre-vetted candidates to facilities.
              Your CS team stays in control of every match — no open marketplace, no chaos.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/signup" className="btn-primary">Sign up as a practitioner</Link>
              <Link href="/login" className="btn-secondary">Team login</Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Demo accounts (password: <code>password</code>):
              <br/>
              admin@staffing.com · cs@staffing.com · recruiter@staffing.com · nurse@example.com · facility@hospital.com
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900">What's in this MVP</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✓ Five role-based logins — Admin, Recruiter, CS, Practitioner, Facility</li>
              <li>✓ Practitioner onboarding with CV upload + AI-extracted profile</li>
              <li>✓ Job postings managed by Customer Success</li>
              <li>✓ Application pipeline: Applied → Under Review → Presented → Interviewing → Accepted</li>
              <li>✓ Facility view shows only candidates CS has presented</li>
              <li>✓ Practitioner earnings tracker (display only)</li>
              <li>✓ Admin overview of every job, application, and placement</li>
            </ul>
            <div className="mt-4 text-xs text-slate-500 border-t pt-3">
              <strong>Out of scope (future phases):</strong> automated background checks, license verification API, messaging, payments / payroll, travel booking, advanced AI matching.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
