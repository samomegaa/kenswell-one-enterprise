const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/RC1/A');

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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

run('verify-structure.js');
run('verify-modules.js');
run('verify-core-exports.js');
run('verify-package-scripts.js');
run('generate-report.js');

const requiredReports = [
  'architecture-report.md',
  'dependency-summary.json',
  'repository-score.json',
];

for (const file of requiredReports) {
  assert(
    fs.existsSync(path.join(REVIEW, file)),
    `Missing generated report: ${file}`
  );
}

const score = JSON.parse(
  fs.readFileSync(
    path.join(REVIEW, 'repository-score.json'),
    'utf8'
  )
);

console.log('');
console.log('----------------------------------------');
console.log('Enterprise 1.0 RC1-A Summary');
console.log('----------------------------------------');
console.log(`Repository Score : ${score.overall}`);
console.log(`Generated At     : ${score.generatedAt}`);
console.log('Status           : PASSED');
console.log('----------------------------------------');
console.log('');

console.log('✅ Enterprise RC1-A Repository Architecture Review passed');
