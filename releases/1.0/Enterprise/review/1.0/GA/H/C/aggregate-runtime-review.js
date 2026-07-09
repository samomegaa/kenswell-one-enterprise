const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/GA/H/C');

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
  'verify-runtime-structure.js',
  'verify-runtime-exports.js',
  'verify-runtime-capabilities.js',
  'verify-runtime-consistency.js',
  'generate-runtime-report.js',
].forEach(run);

['runtime-report.md', 'runtime-score.json'].forEach((file) => {
  assert(fs.existsSync(path.join(REVIEW, file)), `Missing generated artifact: ${file}`);
});

const score = JSON.parse(
  fs.readFileSync(path.join(REVIEW, 'runtime-score.json'), 'utf8')
);

console.log('');
console.log('------------------------------------------------');
console.log('Enterprise 1.0-GA-H-C Summary');
console.log('------------------------------------------------');
console.log(`Runtime Score    : ${score.runtimeScore}`);
console.log(`Runtime Services : ${score.runtimeServices}`);
console.log(`Generated At     : ${score.generatedAt}`);
console.log(`Status           : ${score.status}`);
console.log('------------------------------------------------');
console.log('');

console.log('✅ Enterprise Runtime Certification passed');
