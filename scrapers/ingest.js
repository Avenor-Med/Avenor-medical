// scrapers/ingest.js
// Orchestrator — runs every ingester, aggregates stats, reports.
import 'dotenv/config';
import { ingest as usajobs }  from './aggregators/usajobs.js';
import { ingest as adzuna }   from './aggregators/adzuna.js';
import { ingest as jooble }   from './aggregators/jooble.js';
import { ingest as themuse }  from './aggregators/themuse.js';
import { ingest as hca }      from './hospitals/hca.js';
import { ingest as mayo }     from './hospitals/mayo.js';
import { log, logError } from './shared/logger.js';

const SOURCES = [
  { name: 'usajobs', fn: usajobs, enabled: !!process.env.USAJOBS_EMAIL },
  { name: 'adzuna',  fn: adzuna,  enabled: !!process.env.ADZUNA_APP_ID },
  { name: 'jooble',  fn: jooble,  enabled: !!process.env.JOOBLE_API_KEY },
  { name: 'themuse', fn: themuse, enabled: true },
  { name: 'hca',     fn: hca,     enabled: process.env.RUN_SCRAPERS === 'true' },
  { name: 'mayo',    fn: mayo,    enabled: process.env.RUN_SCRAPERS === 'true' }
];

async function main() {
  const start = Date.now();
  const results = [];

  for (const s of SOURCES) {
    if (!s.enabled) {
      log('orchestrator', `SKIP ${s.name} (disabled or missing key)`);
      continue;
    }
    log('orchestrator', `START ${s.name}`);
    try {
      const r = await s.fn();
      results.push({ ...r, ok: true });
    } catch (e) {
      logError('orchestrator', e);
      results.push({ source: s.name, ok: false, error: e.message });
    }
  }

  const duration = Math.round((Date.now() - start) / 1000);
  log('orchestrator', 'complete', { duration_s: duration, results });
  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => { logError('orchestrator', err); process.exit(1); });
}

export { main };
