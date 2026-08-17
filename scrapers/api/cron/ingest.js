// scrapers/api/cron/ingest.js
// Vercel Cron endpoint — Vercel calls this nightly at 2am UTC
// (schedule defined in ../../vercel.json).
//
// Vercel auth: set CRON_SECRET in Vercel env; requests must include it in the
// Authorization header. Prevents random visitors from triggering ingestion.

import { main } from '../../ingest.js';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const results = await main();
    res.status(200).json({ ok: true, results });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
