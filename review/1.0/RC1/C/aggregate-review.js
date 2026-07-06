const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/RC1/C');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(script) {
  console.log(`▶ ${script}`);

  execFileSync(
    process.execPath,
    [path.join(REVIEW, script)],
    {
      stdio: 'inherit',
    }
  );
}

const scripts = [
  'verify-core-api-surface.js',
  'verify-layer-api-surface.js',
  'verify-public-symbols.js',
  'verify-api-consistency.js',
  'generate-report.js',
];

for (const script of scripts) {
  run(script);
}

const requiredReports = [
  'api-surface-report.md',
  'api-surface-summary.json',
  'api-surface-score.json',
];

for (const report of requiredReports) {
  assert(
    fs.existsSync(path.join(REVIEW, report)),
    `Missing generated report: ${report}`
  );
}

const score = JSON.parse(
  fs.readFileSync(
    path.join(REVIEW, 'api-surface-score.json'),
    'utf8'
  )
);

console.log('');
console.log('----------------------------------------');
console.log('Enterprise 1.0 RC1-C Summary');
console.log('----------------------------------------');
console.log(`API Surface Score : ${score.overall}`);
console.log(`Generated At      : ${score.generatedAt}`);
console.log('Status            : PASSED');
console.log('----------------------------------------');
console.log('');

console.log('✅ Enterprise RC1-C Public API Surface Review passed');
