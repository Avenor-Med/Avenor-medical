// Application-wide configuration. Single source of truth — no magic numbers
// scattered through components.

export const SITE = {
  name: 'Avenor Medical',
  legalName: 'Avenor Medical LLC',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avenormedical.com',
  email: 'info@avenormedical.com',
  phone: '(800) 467-3737',
  tagline: 'Nationwide Healthcare Staffing',
} as const;

export const PAGINATION = {
  jobsPerPage: 24,
  apiMaxPerPage: 50,
  dashboardRows: 10,
} as const;

export const UPLOAD = {
  maxBytes: 10 * 1024 * 1024,
  allowedMimeTypes: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ],
  bucket: 'resumes',
} as const;

export const RATE_LIMITS = {
  uploadsPerHour: 10,
  parsesPerHour: 20,
  windowMs: 3_600_000,
} as const;

export const MATCHING = {
  topMatches: 10,
  weights: {
    specialty: 40,
    license: 25,
    experience: 15,
    schedule: 10,
    bonus: 10,
  },
} as const;

export const CREDENTIALING = {
  totalChecks: 24,
} as const;
