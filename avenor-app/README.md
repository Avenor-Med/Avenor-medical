# Avenor Medical — Production Application

Next.js 14 + TypeScript + Supabase. Server-side authentication, role-based access
enforced in Postgres (Row-Level Security), encrypted private file storage, and an
append-only audit log.

This replaces the single-file HTML prototype. The prototype stays in the repo root
(`../index.html`) as the design reference until every page is ported.

## Architecture

```
Browser
  └─ Next.js (Vercel)
       ├─ middleware.ts       auth gate — refreshes session, blocks anonymous
       ├─ app/                pages + API routes (server components by default)
       ├─ lib/supabase/       server + browser clients
       └─ lib/roles.ts        role definitions + area access map
Supabase
  ├─ Auth                     bcrypt, JWT + refresh rotation, MFA, email verify
  ├─ Postgres + RLS           every table policy-guarded (supabase/schema.sql)
  ├─ Storage (private)        resumes bucket — owner-only access
  └─ audit_log                append-only, admin-readable
```

Security decisions worth knowing:
- No secrets in the browser. Anon key is public by design (RLS is the guard);
  service-role key exists only in server env.
- Roles live in `profiles.role`, written only by admin policy. The client never
  sends its role — layouts and API handlers read it from the database per request.
- The audit_log table has no update or delete policy — appends only.
- Résumé files live in a private bucket; access requires an owner-scoped
  signed URL minted server-side.

## Local development

```bash
npm install
cp .env.example .env.local     # fill in Supabase keys
npm run dev                    # http://localhost:3000
```

## Database setup (one-time)

1. Supabase dashboard → SQL Editor → New query
2. Paste the entire contents of `supabase/schema.sql`
3. Run. Verify tables appear in Table Editor with RLS badges.

## Deploy

Push to `main` → Vercel builds and deploys. Set env vars in
Vercel → Project → Settings → Environment Variables (same names as `.env.example`).

## Tomorrow's deploy checklist (in order)

1. **Supabase** (supabase.com → New Project, name `avenor-medical`)
   - SQL Editor → paste `supabase/schema.sql` → Run
   - SQL Editor → paste `supabase/seed.sql` → Run (loads 60 facilities + 286 jobs)
   - Settings → API → copy Project URL, anon key, service_role key
2. **GitHub** — push this repo (see root-level instructions)
3. **Vercel** (vercel.com → sign in with GitHub → Import repo)
   - Root Directory: `avenor-app`
   - Environment variables: every name in `.env.example`, with the Supabase
     values from step 1 + your Anthropic API key
   - Deploy
4. **Smoke test** on the deployed URL:
   - `/` homepage shows the live job count (proves DB connection)
   - `/jobs` lists the seeded positions with pagination
   - `/signup` → create an account → verify email → `/dashboard` routes you
     to the practitioner view
   - Upload a `.txt` résumé → matches appear
5. **Make yourself admin**: Supabase → Table Editor → `profiles` → your row →
   set `role` to `admin`. Reload `/dashboard` — you land on the admin view
   with the audit trail.

## Quality gates

```bash
npm run lint        # ESLint (next/core-web-vitals)
npm run typecheck   # strict TypeScript, no emit
npm run build       # production build must pass before merge
```
