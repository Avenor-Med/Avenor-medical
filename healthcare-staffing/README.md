# Healthcare Staffing Platform — MVP Prototype

A controlled platform that lets a staffing company onboard practitioners, manage facilities and job postings, let practitioners apply to roles, and run the full applicant pipeline — while the staffing team keeps full control over matching, approval, and placement.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind + Prisma + SQLite + Anthropic Claude API**.

---

## Quick start (local)

You need Node.js 18.17+ installed. Then, in this folder:

```bash
# 1. Install dependencies
npm install

# 2. Set up the database and seed demo data
npm run setup

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Demo accounts

Login at `/login` with any of these (password is `password` for all of them):

| Role         | Email                    | What they can do                                     |
|--------------|--------------------------|------------------------------------------------------|
| Admin        | admin@staffing.com       | See everything, manage users                         |
| Recruiter    | recruiter@staffing.com   | Approve / reject practitioner profiles               |
| CS (Operator)| cs@staffing.com          | Create facilities, post jobs, run the pipeline       |
| Practitioner | nurse@example.com        | Upload CV, apply to jobs, track status               |
| Facility     | facility@hospital.com    | View only candidates that CS has presented           |

The seed script also creates 3 facilities, 5 job postings, and a practitioner with a partly-completed pipeline so the dashboards are populated from the moment you log in.

---

## Where the AI fits

When a practitioner uploads a CV, the server calls Claude to extract structured fields (years of experience, specialties, certifications, prior employers) and pre-fills the profile form.

Behavior depends on your `.env`:

- **`ANTHROPIC_API_KEY` set** → real Claude API call; structured extraction from the actual CV text.
- **`ANTHROPIC_API_KEY` blank** → realistic mock extraction with a 1.5s simulated delay, clearly labeled "(demo mode)" in the UI. The demo never breaks.

Get a key at https://console.anthropic.com, paste it into `.env`, restart the server, and the same code path switches to real AI. No code changes needed.

---

## Project layout

```
healthcare-staffing/
├── prisma/
│   ├── schema.prisma       # Data model (User, Practitioner, Facility, Job, Application, …)
│   └── seed.ts             # Demo data — 5 users, 3 facilities, 5 jobs
├── src/
│   ├── app/
│   │   ├── login/                 # Login page
│   │   ├── signup/                # Practitioner self-signup
│   │   ├── practitioner/          # Practitioner role pages
│   │   ├── recruiter/             # Recruiter role pages
│   │   ├── cs/                    # Customer Success — operator
│   │   ├── facility/              # Facility role pages
│   │   ├── admin/                 # Admin role pages
│   │   └── api/                   # Auth, upload, parse-cv, pipeline actions
│   ├── components/                # Shared UI (Nav, Sidebar, StageBadge, etc.)
│   └── lib/
│       ├── prisma.ts              # Prisma client singleton
│       ├── auth.ts                # Session cookie helpers, role guards
│       ├── ai.ts                  # Claude CV parser with mock fallback
│       └── utils.ts
├── public/uploads/                # Uploaded CVs (created on first upload)
├── package.json
├── .env                           # Local env vars (DO NOT commit)
├── .env.example
└── README.md
```

---

## What's in scope (per the MVP spec)

- 5 roles: Admin, Recruiter, CS, Practitioner, Facility
- Practitioner onboarding — profile + document upload (CV / License / Certifications) + AI-assisted CV parsing
- Job management — CS creates postings (role, location, schedule, rate, requirements)
- Application system — practitioners apply to jobs
- **Pipeline / Workflow (core engine)** — Applied → Under Review (CS) → Presented to Facility → Interviewing → Accepted / Rejected
- Controlled matching — facilities never browse the open practitioner pool; CS is the gatekeeper
- Three dashboards — Practitioner (jobs, status, earnings), Facility (presented candidates, spend), Admin (system-wide)

## What's explicitly *not* in scope (per the spec — for future phases)

- Automated background checks
- License verification API integrations
- Messaging system
- Payments / payroll / tax handling
- Travel / lodging
- Advanced AI matching
- External job board integrations

---

## Deployment

This project deploys to **Vercel** in two clicks:

1. Push the folder to a GitHub repo.
2. Import it at https://vercel.com/new — Vercel auto-detects Next.js.
3. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL` → for production, swap SQLite for managed Postgres (e.g. Neon, Supabase, RDS). Update `prisma/schema.prisma` `provider` to `postgresql` and run `prisma migrate dev`.
   - `ANTHROPIC_API_KEY` → your Anthropic key.
   - `SESSION_SECRET` → any long random string.

For Render / Railway / Fly.io, the same env vars apply.

---

## Tech notes

- **Auth** is session-cookie based, signed with `SESSION_SECRET`. No third-party auth provider — keeps the demo simple.
- **Database** is SQLite for local dev (zero setup). Swap to Postgres for production by changing the Prisma datasource and rerunning `prisma db push`.
- **File uploads** live in `public/uploads/` for the prototype. For production, swap for S3 / GCS — change one function in `src/lib/upload.ts`.
- **No tests yet** — that's day-2 work once the flows are validated visually.

---

## Roadmap (after this 3-day prototype)

1. Add real messaging (intercom-style) between CS and practitioners
2. License verification API (NPI registry, state boards)
3. Background check integration (Checkr)
4. Real payments via Stripe Connect (per spec, payments stay out of v1)
5. Mobile app (React Native, same API)
