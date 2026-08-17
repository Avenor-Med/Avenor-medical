# Architecture

Avenor Medical — Next.js 14 (App Router) + TypeScript + Supabase.

## Directory layout

```
src/
├── app/                    Routing only. Each file is a thin page or handler;
│   │                       data access and rules live in services.
│   ├── page.tsx            Public marketing home
│   ├── jobs/               Public job board + detail
│   ├── legal/              Privacy, Terms
│   ├── login/              ─┐
│   ├── signup/              ├ Authentication
│   ├── reset-password/     ─┤
│   ├── auth/callback/      ─┘ (email verification + reset exchange)
│   ├── dashboard/
│   │   ├── practitioner/   Nurse / clinician portal
│   │   ├── facility/       Facility portal
│   │   ├── recruiter/      Recruiter portal
│   │   ├── cs/             Customer Success portal
│   │   └── admin/          Admin portal
│   └── api/                Route handlers (jobs, resumes, auth, cron)
│
├── components/             Reusable UI. No data fetching.
│   ├── ui/                 Button, Card, Badge, DataTable, Field
│   ├── jobs/               JobCard, JobGrid
│   └── resume/             ResumeUploader
│
├── layouts/                Page shells
│   ├── PublicLayout.tsx    Marketing + job board chrome
│   ├── AuthLayout.tsx      Centered auth card
│   └── PortalLayout.tsx    Signed-in portal shell; nav derived from role
│
├── hooks/                  Client-side state
│   ├── useResumeUpload.ts  upload → parse → refresh sequence
│   └── useAuthForm.ts      shared submit/busy/error handling
│
├── services/               Business logic and all data access
│   ├── jobs.service.ts     Job queries, pagination, sitemap feed
│   ├── resume.service.ts   Store → extract → parse → verify → match
│   ├── auth.service.ts     Session + profile reads
│   ├── scoring.ts          Weighted match rubric
│   ├── extract.ts          PDF / DOCX / TXT text extraction
│   ├── audit.ts            Append-only audit logging
│   ├── supabase/           Server, admin, and browser clients
│   └── ingest/             Nightly job-source ingesters
│
├── utils/                  Pure helpers
│   ├── format.ts           Currency, dates, labels
│   ├── guard.ts            requireRole — server-side route protection
│   └── ratelimit.ts        Endpoint throttling
│
├── constants/              Configuration and domain vocabulary
│   ├── config.ts           Site, pagination, upload, rate limits, weights
│   ├── roles.ts            Role union + area access map
│   └── taxonomy.ts         Specialties, related-specialty map, NLC states
│
├── styles/
│   ├── globals.css         Entry point
│   ├── tokens.css          Design tokens (colour, type, motion)
│   └── base.css            Element defaults, focus, reduced-motion
│
└── assets/                 Static brand assets
```

## Rules this structure enforces

**Pages never query the database.** Every read goes through a service. Change a
query once and every caller gets it.

**Components never fetch.** They receive props. That keeps them testable and
reusable across portals.

**Role checks are server-side.** `requireRole()` reads the role from Postgres on
each request; `PortalLayout` derives navigation from it. A client cannot grant
itself a portal.

**Contrast is structural.** `Card`, `Badge`, and `DataTable` take a surface tone
and pair text with it internally — the light-wrapper / light-text mismatch that
caused invisible tables cannot recur through these components.

**One source for every constant.** Colours live in `tokens.css` and
`tailwind.config.js` reads the same values; limits and weights live in
`constants/config.ts`.

## Separation of concerns by area

| Area | Routes | Layout | Access |
|---|---|---|---|
| Public website | `/`, `/jobs`, `/legal/*` | `PublicLayout` | Anonymous |
| Authentication | `/login`, `/signup`, `/reset-password`, `/auth/callback` | `AuthLayout` | Anonymous |
| Nurse portal | `/dashboard/practitioner` | `PortalLayout` | `practitioner` |
| Facility portal | `/dashboard/facility` | `PortalLayout` | `facility` |
| Recruiter / CS | `/dashboard/recruiter`, `/dashboard/cs` | `PortalLayout` | `recruiter`, `cs`, `admin` |
| Admin portal | `/dashboard/admin` | `PortalLayout` | `admin` |

Middleware blocks anonymous traffic to `/dashboard/*` before a page renders;
`requireRole()` then enforces the specific role; Postgres RLS is the final
backstop at the data layer.

## Before first build

See `CLEANUP.md` — the pre-refactor `app/`, `components/`, and `lib/`
directories must be deleted (Next.js refuses to start with both `app/` and
`src/app/` present).
