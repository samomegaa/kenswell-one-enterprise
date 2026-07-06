const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/RC1/E');

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
  'verify-error-standards.js',
  'verify-middleware-standards.js',
  'verify-result-standards.js',
  'verify-review-documentation.js',
  'generate-report.js',
];

for (const script of scripts) {
  run(script);
}

const requiredReports = [
  'enterprise-standards-report.md',
  'enterprise-standards-summary.json',
  'enterprise-standards-score.json',
];

for (const report of requiredReports) {
  assert(
    fs.existsSync(path.join(REVIEW, report)),
    `Missing generated report: ${report}`
  );
}

const score = JSON.parse(
  fs.readFileSync(
    path.join(REVIEW, 'enterprise-standards-score.json'),
    'utf8'
  )
);

console.log('');
console.log('----------------------------------------');
console.log('Enterprise 1.0 RC1-E Summary');
console.log('----------------------------------------');
console.log(`Enterprise Standards Score : ${score.overall}`);
console.log(`Generated At               : ${score.generatedAt}`);
console.log('Status                     : PASSED');
console.log('----------------------------------------');
console.log('');

console.log('✅ Enterprise RC1-E Enterprise Standards Review passed');
