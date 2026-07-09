const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const REVIEW = path.join(ROOT, 'review/1.0/GA/H/F');

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

[
  'verify-platform-certification-structure.js',
  'verify-certification-evidence.js',
  'verify-platform-readiness.js',
  'verify-ga-readiness.js',
  'generate-platform-certification-report.js',
].forEach(run);

[
  'ENTERPRISE-PLATFORM-CERTIFICATION.md',
  'platform-certification-score.json',
  'platform-certification-status.json',
].forEach(file => {
  assert(
    fs.existsSync(path.join(REVIEW, file)),
    `Missing certification artifact: ${file}`
  );
});

const score = JSON.parse(
  fs.readFileSync(
    path.join(REVIEW, 'platform-certification-score.json'),
    'utf8'
  )
);

console.log('');
console.log('================================================');
console.log('KENSWELL ONE ENTERPRISE');
console.log('GENERAL AVAILABILITY');
console.log('================================================');
console.log(`Architecture Score       : ${score.architectureScore}`);
console.log(`Runtime Certified        : ${score.runtimeCertified}`);
console.log(`Platform Certified       : ${score.platformServicesCertified}`);
console.log(`Engineering Certified    : ${score.engineeringCertified}`);
console.log(`Production Ready         : ${score.productionReady}`);
console.log(`Status                   : ${score.status}`);
console.log('================================================');
console.log('');
console.log('🎉 KENSWELL ONE ENTERPRISE v1.0.0');
console.log('🎉 GENERAL AVAILABILITY CERTIFIED');
console.log('');
console.log('Congratulations.');
