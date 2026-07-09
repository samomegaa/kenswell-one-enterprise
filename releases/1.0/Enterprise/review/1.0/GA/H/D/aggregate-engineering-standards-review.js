const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/GA/H/D');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function run(script) {
  console.log(`▶ ${script}`);
  execFileSync(process.execPath, [path.join(REVIEW, script)], {
    stdio: 'inherit',
  });
}

[
  'verify-verification-script-standards.js',
  'verify-documentation-standards.js',
  'verify-package-script-standards.js',
  'verify-release-structure-standards.js',
  'generate-engineering-standards-report.js',
].forEach(run);

[
  'engineering-standards-report.md',
  'engineering-standards-score.json',
].forEach((file) => {
  assert(fs.existsSync(path.join(REVIEW, file)), `Missing generated artifact: ${file}`);
});

const score = JSON.parse(
  fs.readFileSync(path.join(REVIEW, 'engineering-standards-score.json'), 'utf8')
);

console.log('');
console.log('------------------------------------------------');
console.log('Enterprise 1.0-GA-H-D Summary');
console.log('------------------------------------------------');
console.log(`Engineering Standards Score : ${score.engineeringStandardsScore}`);
console.log(`Standards Checked           : ${score.standardsChecked}`);
console.log(`Generated At                : ${score.generatedAt}`);
console.log(`Status                      : ${score.status}`);
console.log('------------------------------------------------');
console.log('');

console.log('✅ Enterprise Engineering Standards Certification passed');
