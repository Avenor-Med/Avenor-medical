import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Avenor Medical',
  description: 'Terms governing use of the Avenor Medical platform.',
};

const UPDATED = 'August 1, 2026';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl text-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {UPDATED}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-serif text-xl text-navy">1. Agreement</h2>
          <p className="mt-2">
            These Terms govern your use of the Avenor Medical platform operated
            by Avenor Medical LLC. By creating an account or using the service,
            you agree to them. If you do not agree, do not use the platform.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">2. Eligibility</h2>
          <p className="mt-2">
            You must be at least 18 years old and legally permitted to work in
            the United States in the role you seek. Clinician accounts require
            that you hold, or are actively pursuing, the professional licensure
            you represent.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">3. Accuracy of information</h2>
          <p className="mt-2">
            You are responsible for the accuracy of everything you submit,
            including licenses, certifications, and employment history.
            Misrepresenting credentials is grounds for immediate termination and
            may be reported to licensing authorities.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">4. Our role</h2>
          <p className="mt-2">
            Avenor is a staffing intermediary. We verify credentials and present
            candidates to facilities. We do not guarantee placement, a specific
            rate, or continued engagement. Employment terms are set between you
            and the placing entity. Nothing here creates an employment
            relationship with Avenor unless separately agreed in writing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">5. Credentialing</h2>
          <p className="mt-2">
            We conduct primary-source verification and exclusion screening as
            part of placement. You authorize us to obtain and verify this
            information, and to share verified results with facilities
            considering your candidacy. You must notify us promptly of any
            change to your licensure status, including restrictions or
            disciplinary action.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">6. Acceptable use</h2>
          <p className="mt-2">You may not:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Upload documents containing patient information</li>
            <li>Scrape, copy, or resell job listings or platform data</li>
            <li>Create accounts for anyone other than yourself</li>
            <li>Attempt to bypass authentication or access other users&rsquo; data</li>
            <li>Upload malware or interfere with platform operation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">7. Job listings</h2>
          <p className="mt-2">
            Listings come from partner facilities and third-party sources.
            While we work to keep them current, we do not warrant that any
            listing is available, accurate, or complete at the time you view it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">8. Intellectual property</h2>
          <p className="mt-2">
            The platform, its software, and its content are owned by Avenor
            Medical LLC. You retain ownership of documents you upload and grant
            us a license to process and share them for the purposes described in
            our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">9. Disclaimers</h2>
          <p className="mt-2">
            The platform is provided &ldquo;as is&rdquo; without warranties of
            any kind. We do not warrant uninterrupted or error-free operation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">10. Limitation of liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, Avenor is not liable for
            indirect, incidental, or consequential damages, or for lost profits
            or lost opportunities. Our total liability for any claim is limited
            to the amount you paid us in the twelve months preceding the claim,
            or one hundred dollars, whichever is greater.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">11. Termination</h2>
          <p className="mt-2">
            You may close your account at any time. We may suspend or terminate
            accounts that violate these Terms or where required by law.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">12. Governing law</h2>
          <p className="mt-2">
            These Terms are governed by the laws of the State of Texas, without
            regard to conflict-of-law principles. Disputes will be resolved in
            the state or federal courts located in Dallas County, Texas.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-navy">13. Contact</h2>
          <p className="mt-2">
            <a href="mailto:info@avenormedical.com" className="text-brass-dark">
              info@avenormedical.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
