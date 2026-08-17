# External job ingestion — DORMANT

Avenor publishes only its own contracted positions. Listings are entered by
Customer Success or bulk-imported from `supabase/jobs-import.sql`.

The aggregator ingesters in `src/services/ingest/` remain in the codebase but
are **not scheduled** — the cron entry has been removed from `vercel.json`.

To re-enable external sourcing later:

1. Add back to `vercel.json`:
   ```json
   { "path": "/api/cron/ingest", "schedule": "0 7 * * *" }
   ```
2. Set `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `JOOBLE_API_KEY`, `USAJOBS_EMAIL`
   in Vercel environment variables.

Nothing else needs to change; the code is intact and tested.
