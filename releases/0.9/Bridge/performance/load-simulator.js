const fs = require('fs');
const path = require('path');

const { summary, nowMs } = require('./performance-utils');

const BASE_URL = process.env.BRIDGE_BASE_URL || 'http://localhost:3000';
const USERS = (process.env.BRIDGE_LOAD_USERS || '10,25,50').split(',').map(Number);
const REQUESTS_PER_USER = Number(process.env.BRIDGE_REQUESTS_PER_USER || 3);
const OUT_DIR = path.join(__dirname, 'results');

async function oneRequest(user, index) {
  const started = nowMs();

  try {
    const response = await fetch(`${BASE_URL}/health`, {
      headers: {
        'X-Request-Id': `load-user-${user}-${index}-${Date.now()}`,
      },
    });

    return {
      ok: response.ok,
      status: response.status,
      latencyMs: nowMs() - started,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      latencyMs: nowMs() - started,
      error: error.message,
    };
  }
}

async function runScenario(users) {
  const started = nowMs();
  const promises = [];

  for (let user = 1; user <= users; user += 1) {
    for (let index = 1; index <= REQUESTS_PER_USER; index += 1) {
      promises.push(oneRequest(user, index));
    }
  }

  const samples = await Promise.all(promises);
  const durationMs = nowMs() - started;
  const failures = samples.filter((sample) => !sample.ok).length;
  const latencies = samples.map((sample) => sample.latencyMs);

  return {
    users,
    totalRequests: samples.length,
    requestsPerUser: REQUESTS_PER_USER,
    durationMs,
    requestsPerSecond: Number((samples.length / (durationMs / 1000)).toFixed(2)),
    failures,
    latency: summary(latencies),
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const scenarios = [];

  for (const users of USERS) {
    scenarios.push(await runScenario(users));
  }

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    scenarios,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'load-simulator-results.json'),
    JSON.stringify(output, null, 2)
  );

  console.log('Load simulation complete');
  console.log(`Results: ${path.join(OUT_DIR, 'load-simulator-results.json')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
