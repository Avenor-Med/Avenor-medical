import type { Metadata } from 'next';
import '@/styles/globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avenormedical.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Avenor Medical — Nationwide Healthcare Staffing',
    template: '%s | Avenor Medical',
  },
  description:
    'Avenor Medical places U.S.-licensed physicians, nurse practitioners, and nurses in the nation’s finest facilities — fully credentialed before day one.',
  keywords: [
    'healthcare staffing',
    'locum tenens',
    'travel nursing',
    'physician jobs',
    'nurse practitioner jobs',
    'CRNA jobs',
    'medical credentialing',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Avenor Medical',
    title: 'Avenor Medical — Nationwide Healthcare Staffing',
    description:
      'Every clinician verified against a 24-point credentialing standard before day one.',
    url: SITE,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avenor Medical — Nationwide Healthcare Staffing',
    description:
      'Every clinician verified against a 24-point credentialing standard before day one.',
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Avenor Medical',
  url: SITE,
  email: 'info@avenormedical.com',
  description:
    'Nationwide healthcare staffing company specializing in credentialed physician, APP, and nursing placements.',
  areaServed: { '@type': 'Country', name: 'United States' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
