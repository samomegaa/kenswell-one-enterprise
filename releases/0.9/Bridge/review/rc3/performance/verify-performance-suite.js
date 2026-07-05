const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'performance/performance-utils.js',
  'performance/api-benchmark.js',
  'performance/load-simulator.js',
  'performance/memory-profiler.js',
  'performance/generate-performance-report.js',
  'review/rc3/performance/PERFORMANCE-VALIDATION.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing performance file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Performance file is empty: ${file}`);
  }
}

console.log('Performance validation suite verified');
