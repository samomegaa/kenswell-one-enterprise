const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/GA/H/B');

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
  'verify-platform-service-structure.js',
  'verify-platform-service-exports.js',
  'verify-platform-service-capabilities.js',
  'verify-platform-service-consistency.js',
  'generate-platform-service-report.js',
].forEach(run);

['platform-service-report.md', 'platform-service-score.json'].forEach((file) => {
  assert(fs.existsSync(path.join(REVIEW, file)), `Missing generated artifact: ${file}`);
});

const score = JSON.parse(
  fs.readFileSync(path.join(REVIEW, 'platform-service-score.json'), 'utf8')
);

console.log('');
console.log('------------------------------------------------');
console.log('Enterprise 1.0-GA-H-B Summary');
console.log('------------------------------------------------');
console.log(`Service Score     : ${score.serviceScore}`);
console.log(`Platform Services : ${score.platformServices}`);
console.log(`Generated At      : ${score.generatedAt}`);
console.log(`Status            : ${score.status}`);
console.log('------------------------------------------------');
console.log('');

console.log('✅ Enterprise Platform Services Certification passed');
