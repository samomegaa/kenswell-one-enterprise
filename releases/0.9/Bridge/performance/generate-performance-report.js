const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'results');
const reportFile = path.join(__dirname, 'PERFORMANCE-REPORT.md');

function readJson(file) {
  const full = path.join(OUT_DIR, file);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

const benchmark = readJson('api-benchmark-results.json');
const load = readJson('load-simulator-results.json');
const memory = readJson('memory-profile-results.json');

const lines = [
  '# RC3-A — Performance Validation Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Environment',
  '',
  `- Node.js: ${process.version}`,
  `- Platform: ${process.platform}`,
  `- Architecture: ${process.arch}`,
  '',
  '## API Benchmark',
  '',
];

if (benchmark) {
  lines.push(`Base URL: ${benchmark.baseUrl}`, '');
  lines.push('| Endpoint | Failures | Avg ms | Median ms | P95 ms | P99 ms |');
  lines.push('|---|---:|---:|---:|---:|---:|');

  for (const item of benchmark.results) {
    lines.push(`| ${item.endpoint} | ${item.failures} | ${item.latency.avg} | ${item.latency.median} | ${item.latency.p95} | ${item.latency.p99} |`);
  }
} else {
  lines.push('No API benchmark results available.');
}

lines.push('', '## Load Simulation', '');

if (load) {
  lines.push('| Users | Requests | RPS | Failures | Avg ms | P95 ms |');
  lines.push('|---:|---:|---:|---:|---:|---:|');

  for (const item of load.scenarios) {
    lines.push(`| ${item.users} | ${item.totalRequests} | ${item.requestsPerSecond} | ${item.failures} | ${item.latency.avg} | ${item.latency.p95} |`);
  }
} else {
  lines.push('No load simulation results available.');
}

lines.push('', '## Memory & Event Loop', '');

if (memory) {
  lines.push(`- RSS: ${memory.memory.rss}`);
  lines.push(`- Heap Used: ${memory.memory.heapUsed}`);
  lines.push(`- Heap Total: ${memory.memory.heapTotal}`);
  lines.push(`- Event Loop Mean Delay: ${memory.eventLoop.meanMs}ms`);
  lines.push(`- Event Loop P95 Delay: ${memory.eventLoop.p95Ms}ms`);
  lines.push(`- Event Loop P99 Delay: ${memory.eventLoop.p99Ms}ms`);
} else {
  lines.push('No memory profile results available.');
}

lines.push(
  '',
  '## Recommendations',
  '',
  '- Use these results as the first RC3 baseline.',
  '- Run the benchmark against a live Bridge process for meaningful API latency results.',
  '- Repeat before 0.9.0 GA and compare trends.',
  '- Add Redis-backed rate limiting before multi-instance production deployment.',
  ''
);

fs.writeFileSync(reportFile, lines.join('\n'));

console.log('Performance report generated');
console.log(`Report: ${reportFile}`);
