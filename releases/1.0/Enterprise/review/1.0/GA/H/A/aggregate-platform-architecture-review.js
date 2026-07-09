const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/GA/H/A');

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
  'verify-platform-structure.js',
  'verify-platform-service-inventory.js',
  'verify-platform-public-api.js',
  'verify-platform-dependencies.js',
  'generate-platform-architecture-report.js',
];

for (const script of scripts) {
  run(script);
}

const requiredArtifacts = [
  'platform-architecture-report.md',
  'platform-architecture-score.json',
];

for (const artifact of requiredArtifacts) {
  assert(
    fs.existsSync(path.join(REVIEW, artifact)),
    `Missing generated artifact: ${artifact}`
  );
}

const score = JSON.parse(
  fs.readFileSync(
    path.join(REVIEW, 'platform-architecture-score.json'),
    'utf8'
  )
);

console.log('');
console.log('------------------------------------------------');
console.log('Enterprise 1.0-GA-H-A Summary');
console.log('------------------------------------------------');
console.log(`Architecture Score : ${score.architectureScore}`);
console.log(`Runtime Services   : ${score.runtimeServices}`);
console.log(`Platform Services  : ${score.platformServices}`);
console.log(`Generated At       : ${score.generatedAt}`);
console.log(`Status             : ${score.status}`);
console.log('------------------------------------------------');
console.log('');

console.log('✅ Enterprise Platform Architecture Certification passed');
