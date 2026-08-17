// scrapers/shared/logger.js
export function log(source, msg, extra = {}) {
  const stamp = new Date().toISOString();
  const line = { time: stamp, source, msg, ...extra };
  console.log(JSON.stringify(line));
}

export function logError(source, err) {
  console.error(JSON.stringify({
    time: new Date().toISOString(),
    source,
    error: err.message,
    stack: err.stack
  }));
}
