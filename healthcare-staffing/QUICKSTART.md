# Quick-start guide

## 1. Install (one-time)

```bash
cd healthcare-staffing
npm install
npm run setup
```

`npm run setup` creates the SQLite database at `prisma/dev.db` and seeds it with demo users, facilities, jobs, and an in-progress pipeline.

## 2. Run

```bash
npm run dev
```

Open http://localhost:3000 — it'll redirect you to the landing page or your dashboard if you're already logged in.

## 3. Optional: enable the real Claude AI

Open `.env`, paste your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Restart `npm run dev`. The CV parser now uses real Claude. If you skip this step, a mock parser runs instead and the demo still works — just look for the "demo mode" label.

Get a key at https://console.anthropic.com.

---

# Demo walkthrough (~5 minutes)

Show stakeholders the platform end-to-end by logging in as different roles.

## Step 1 — Land as a Practitioner (Nina, ICU Nurse, already approved)

Email: `nurse@example.com` · Password: `password`

You'll see her dashboard with:
- 3 active applications (one Presented, one Under Review, one Applied)
- 1 accepted job from another practitioner (Pat) — earnings shown
- "Browse jobs" → 5 open positions

Click "My applications" — show the pipeline history (Applied → Under Review → Presented).

## Step 2 — Sign up as a brand new practitioner

Sign out (sidebar) → "Sign up". Create any account.

Land on the Profile page:
1. Click **"Choose CV file…"** and select `sample-cv.txt` from the project folder.
2. Watch the **AI extract** profession, specialty, license state, certifications, and a 2-sentence summary.
3. Edit anything that's wrong, then "Save draft".
4. Click "Submit for approval".

> **What just happened**: a real Claude API call (if key set) or the mock parser pre-filled the form. The summary is now visible to recruiters and CS.

## Step 3 — Approve the new practitioner

Sign out → log in as Recruiter:
Email: `recruiter@staffing.com` · Password: `password`

The dashboard shows the new practitioner under "Pending review". Click **Review →**.

Review profile, AI summary, documents → click **Approve**.

The practitioner can now apply to jobs.

## Step 4 — The core engine: the Pipeline (CS Role)

Sign out → log in as Customer Success:
Email: `cs@staffing.com` · Password: `password`

Dashboard shows system metrics. Click **Pipeline**.

You'll see a Kanban board with 5 columns:
- **Applied** → newly received
- **Under Review** → CS is screening
- **Presented to Facility** → shown to the hospital
- **Interviewing** → facility is interviewing
- **Accepted** → placed!

Click on Nina Nurse's card in **Under Review** for the ICU Nurse job. Add a note like "Strong fit, great references" and click **→ Presented to Facility**.

> The card moves columns. The facility user can now see this candidate. Until you click "Presented", facilities cannot see her at all — that's the controlled-matching guarantee.

## Step 5 — Create a new job posting

Still as CS: click **Jobs → + New job**.

Fill in: Memorial Hospital, ER Travel Nurse, San Diego/CA, Day shift, $85/hr, etc. Click **Create job**. The job is now live and bookable from the practitioner side.

## Step 6 — Facility view (restricted)

Sign out → log in as Facility:
Email: `facility@hospital.com` · Password: `password`

You'll see only the candidates CS has presented (not the open practitioner pool). Spend tracking shows real-time dollar amounts based on hours logged × rate.

## Step 7 — Admin view

Sign out → log in as Admin:
Email: `admin@staffing.com` · Password: `password`

Full system overview. Click through Users / Practitioners / Facilities / Jobs / Applications — admin sees everything.

---

# What demonstrates which spec requirement

| Spec requirement                                      | Where to show it                                    |
|-------------------------------------------------------|-----------------------------------------------------|
| 5 roles                                               | Login dropdown — log in as each                     |
| Practitioner onboarding + document upload             | Practitioner → Profile (CV upload + AI parse)       |
| Approval flow                                         | Recruiter → Review → Approve / Reject               |
| Job management (CS posts jobs)                        | CS → Jobs → New job                                 |
| Application system                                    | Practitioner → Browse jobs → Apply                  |
| **Pipeline / Workflow (Core Engine)**                 | CS → Pipeline (Kanban with all 5 stages)            |
| Controlled matching                                   | Facility role only sees PRESENTED+; can't browse pool |
| Practitioner dashboard (jobs, status, earnings)       | Practitioner → Dashboard                            |
| Facility dashboard (candidates, spend)                | Facility → Dashboard                                |
| Admin dashboard (system-wide)                         | Admin → Overview                                    |

---

# Deploy (when you're ready)

**Vercel (easiest):**
1. Push the `healthcare-staffing/` folder to GitHub.
2. https://vercel.com/new → import your repo.
3. Add env vars: `DATABASE_URL`, `ANTHROPIC_API_KEY`, `SESSION_SECRET`.
4. For production, swap SQLite for managed Postgres (Neon, Supabase, RDS):
   - In `prisma/schema.prisma` change `provider = "sqlite"` to `provider = "postgresql"`.
   - Update `DATABASE_URL` to the Postgres connection string.
   - Run `npx prisma db push` then `npm run db:seed` once.

**Other hosts:** Render / Railway / Fly.io all work — same env-var setup.

---

# Troubleshooting

**`prisma: command not found`** → run `npm install` first.

**Database errors after schema change** → `rm prisma/dev.db && npm run setup` to reseed.

**CV parsing returns "demo mode"** → that means `ANTHROPIC_API_KEY` is empty in `.env`. Add it and restart.

**Port 3000 in use** → `PORT=3001 npm run dev`.
