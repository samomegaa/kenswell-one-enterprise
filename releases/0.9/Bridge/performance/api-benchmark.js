const fs = require('fs');
const path = require('path');

const { summary, nowMs } = require('./performance-utils');

const BASE_URL = process.env.BRIDGE_BASE_URL || 'http://localhost:3000';
const ITERATIONS = Number(process.env.BRIDGE_BENCHMARK_ITERATIONS || 5);
const OUT_DIR = path.join(__dirname, 'results');

const endpoints = [
  { name: 'live', path: '/live' },
  { name: 'health', path: '/health' },
  { name: 'ready', path: '/ready' },
  { name: 'client_portal_root', path: '/api/client-portal/portal' },
  { name: 'documents', path: '/api/client-portal/documents' },
  { name: 'messages', path: '/api/client-portal/messages' },
  { name: 'tasks', path: '/api/client-portal/tasks' },
  { name: 'approvals', path: '/api/client-portal/approvals' },
  { name: 'activity', path: '/api/client-portal/activity' },
];

async function request(endpoint) {
  const started = nowMs();

  try {
    const response = await fetch(`${BASE_URL}${endpoint.path}`, {
      headers: {
        'X-Request-Id': `benchmark-${endpoint.name}-${Date.now()}`,
      },
    });

    return {
      ok: response.status < 500,
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

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results = [];

  for (const endpoint of endpoints) {
    const samples = [];

    for (let i = 0; i < ITERATIONS; i += 1) {
      samples.push(await request(endpoint));
    }

    const latencies = samples.map((sample) => sample.latencyMs);
    const failures = samples.filter((sample) => !sample.ok).length;

    results.push({
      endpoint: endpoint.name,
      path: endpoint.path,
      iterations: ITERATIONS,
      failures,
      latency: summary(latencies),
    });
  }

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    iterations: ITERATIONS,
    results,
  };

  fs.writeFileSync(
    path.join(OUT_DIR, 'api-benchmark-results.json'),
    JSON.stringify(output, null, 2)
  );

  console.log('API benchmark complete');
  console.log(`Results: ${path.join(OUT_DIR, 'api-benchmark-results.json')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
