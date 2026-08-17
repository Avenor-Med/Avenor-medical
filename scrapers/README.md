# Avenor Medical — Live Jobs Ingestion Pipeline

This folder contains everything that pulls **real hospital positions** into the Avenor database. Runs on Vercel Cron (or any Node.js server) — not from a local dev machine.

## What's in here

```
scrapers/
├── aggregators/           API-based ingesters (fast, free, high volume)
│   ├── usajobs.js         → VA + military hospital positions
│   ├── adzuna.js          → 30k+ US healthcare aggregate
│   ├── jooble.js          → additional aggregate coverage
│   └── themuse.js         → larger employer coverage
│
├── hospitals/             Direct scrapers for major hospital systems
│   ├── hca.js             → HCA Healthcare (185 hospitals)
│   ├── ascension.js       → Ascension (140 hospitals)
│   ├── kaiser.js          → Kaiser Permanente (39 hospitals)
│   ├── mayo.js            → Mayo Clinic (MN, AZ, FL)
│   ├── clevelandclinic.js → Cleveland Clinic (OH, FL, NV)
│   ├── baylor.js          → Baylor Scott & White
│   ├── mgh.js             → Massachusetts General
│   ├── nyulangone.js      → NYU Langone
│   └── … (add hospitals here)
│
├── shared/                Common utilities
│   ├── db.js              → Supabase client + upsert helpers
│   ├── normalize.js       → Normalize job data across sources
│   └── logger.js          → Structured logging
│
├── ingest.js              → Orchestrator: runs all sources
├── vercel.json            → Cron configuration (nightly 2am UTC)
├── package.json           → Node dependencies
└── .env.example           → API keys template
```

## Setup (one-time, 15 minutes)

### 1. Sign up for the free tier services

| Service | URL | Free tier |
|---|---|---|
| **Supabase** | https://supabase.com | 500MB DB, 1GB storage |
| **Adzuna API** | https://developer.adzuna.com | 1,000 calls/day |
| **Jooble API** | https://jooble.org/api/about | Unlimited (rate-limited) |
| **The Muse API** | https://www.themuse.com/developers/api | Unlimited |
| **USAJobs API** | https://developer.usajobs.gov | Unlimited (just needs email header) |
| **Vercel** | https://vercel.com | Cron + hosting free |

### 2. Configure secrets

Copy `.env.example` → `.env` and fill in:

```
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
ADZUNA_APP_ID=...
ADZUNA_APP_KEY=...
JOOBLE_API_KEY=...
USAJOBS_EMAIL=ops@avenormedical.com
```

### 3. Install + run locally

```bash
cd scrapers
npm install
npm run test-adzuna   # smoke test one aggregator
npm run ingest        # run everything
```

### 4. Deploy to Vercel

```bash
vercel deploy
```

Cron auto-registers from `vercel.json` — scrapers run nightly at 2am UTC and write into Supabase. The front-end reads from the same Supabase project → always up to date.

## Where the code lives that ISN'T in this folder

- Front-end: `../index.html` (reads from Supabase via API route)
- Database schema: `../schema.sql` (10-table PostgreSQL)
- Résumé matcher: `../resume-matcher/match.js` (Sonnet 4.6 based)
