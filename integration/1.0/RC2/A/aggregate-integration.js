const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const INTEGRATION = path.join(ROOT, 'integration/1.0/RC2/A');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(script) {
  console.log(`▶ ${script}`);

  execFileSync(
    process.execPath,
    [path.join(INTEGRATION, script)],
    {
      stdio: 'inherit',
    }
  );
}

const scripts = [
  'verify-pipeline-builder.js',
  'verify-request-context-flow.js',
  'verify-security-policy-flow.js',
  'verify-application-execution-flow.js',
  'generate-report.js',
];

for (const script of scripts) {
  run(script);
}

const requiredReports = [
  'integration-report.md',
  'integration-summary.json',
  'integration-score.json',
];

for (const report of requiredReports) {
  assert(
    fs.existsSync(path.join(INTEGRATION, report)),
    `Missing generated integration artifact: ${report}`
  );
}

const score = JSON.parse(
  fs.readFileSync(
    path.join(INTEGRATION, 'integration-score.json'),
    'utf8'
  )
);

console.log('');
console.log('----------------------------------------');
console.log('Enterprise 1.0 RC2-A Summary');
console.log('----------------------------------------');
console.log(`Integration Score : ${score.overall}`);
console.log(`Generated At      : ${score.generatedAt}`);
console.log('Status            : PASSED');
console.log('----------------------------------------');
console.log('');

console.log('✅ Enterprise RC2-A Request Pipeline Integration passed');
