import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Avenor Medical',
  description:
    'How Avenor Medical collects, uses, protects, and shares information.',
};

const UPDATED = 'August 1, 2026';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {UPDATED}</p>

      <div className="prose mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-serif text-xl text-navy">1. Who we are</h2>
          <p className="mt-2">
            Avenor Medical LLC (&ldquo;Avenor,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us&rdquo;) is a healthcare staffing company that places
            licensed clinicians with facilities across the United States.
            Questions about this policy:{' '}
            <a href="mailto:info@avenormedical.com" className="text-brass-dark">
              info@avenormedical.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">2. Information we collect</h2>
          <p className="mt-2">Directly from you:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Account details — name, email, phone, password (stored hashed)</li>
            <li>
              Résumés and CVs, and the professional information within them:
              profession, specialties, years of experience, employment history
            </li>
            <li>
              Professional credentials — license numbers, issuing states,
              expiration dates, certifications
            </li>
            <li>Work preferences — locations, shift types, availability</li>
            <li>Communications you send us</li>
          </ul>
          <p className="mt-3">Automatically:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>IP address, browser type, and pages visited</li>
            <li>Authentication session cookies (required for login)</li>
          </ul>
          <p className="mt-3 font-semibold text-navy">
            We do not collect Protected Health Information (PHI). Do not include
            patient information in any document you upload.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">3. How we use information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Matching you to open positions</li>
            <li>Verifying credentials and license currency</li>
            <li>Presenting your candidacy to facilities — only with your consent</li>
            <li>Operating and securing the platform</li>
            <li>Sending service messages and, if you opt in, job alerts</li>
            <li>Meeting legal and regulatory obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">4. Automated processing</h2>
          <p className="mt-2">
            We use AI (Anthropic&rsquo;s Claude) to read uploaded résumés and
            extract structured professional information, and a scoring algorithm
            to rank open positions by fit. These systems assist our recruiters;
            they do not make final placement decisions. You may request human
            review of any automated result.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">5. How we share information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Healthcare facilities</strong> — your profile and
              credentials, only for roles you have agreed to be presented for
            </li>
            <li>
              <strong>Service providers</strong> — hosting (Vercel), database
              and storage (Supabase), AI processing (Anthropic), each bound by
              contract to protect your data
            </li>
            <li>
              <strong>Verification sources</strong> — state licensing boards and
              exclusion registries, to confirm credentials
            </li>
            <li>
              <strong>Legal</strong> — when required by law or to protect rights
              and safety
            </li>
          </ul>
          <p className="mt-3">We do not sell your personal information.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">6. Security</h2>
          <p className="mt-2">
            Data is encrypted at rest (AES-256) and in transit (TLS). Access is
            enforced server-side with role-based permissions at the database
            level. Uploaded documents are stored in private buckets accessible
            only to their owner and authorized staff. All access to records is
            written to an append-only audit log. No system is perfectly secure,
            but these controls are maintained continuously.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">7. Retention</h2>
          <p className="mt-2">
            Account and résumé data is retained while your account is active and
            for up to 24 months afterward, unless you request earlier deletion.
            Audit logs are retained for six years. Placement records may be kept
            longer where required by law or facility contract.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">8. Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your
            personal information, withdraw consent to be presented to
            facilities, or opt out of marketing email at any time. Residents of
            California, Colorado, Connecticut, Utah, Virginia, and other states
            with applicable privacy laws have additional rights including data
            portability and the right to appeal a decision. Email{' '}
            <a href="mailto:info@avenormedical.com" className="text-brass-dark">
              info@avenormedical.com
            </a>{' '}
            — we respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">9. HIPAA</h2>
          <p className="mt-2">
            Avenor does not currently store or process Protected Health
            Information and is not acting as a covered entity or business
            associate. Our infrastructure is built to HIPAA-aligned security
            controls, and we will execute Business Associate Agreements before
            undertaking any engagement that involves PHI.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">10. Children</h2>
          <p className="mt-2">
            The platform is intended for licensed professionals and is not
            directed to anyone under 18.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">11. Changes</h2>
          <p className="mt-2">
            We will post any changes here and update the date above. Material
            changes will be emailed to registered users.
          </p>
        </section>
      </div>
    </main>
  );
}
