const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const releaseFiles = [
  'releases/1.0/README.md',
  'releases/1.0/CHANGELOG.md',
  'releases/1.0/RELEASE-NOTES.md',
  'releases/1.0/CERTIFICATION.md',
  'releases/1.0/ARCHITECTURE.md',
  'releases/1.0/ROADMAP.md',
  'releases/1.0/MANIFEST.json',
];

const missing = releaseFiles.filter((file) => !exists(file));

assert(
  missing.length === 0,
  `Missing release package files:\n${missing.join('\n')}`
);

const manifest = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, 'releases/1.0/MANIFEST.json'),
    'utf8'
  )
);

assert(
  manifest.platform === 'Kenswell One Enterprise',
  'Incorrect platform name'
);

assert(
  manifest.version === '1.0.0',
  'Incorrect version'
);

assert(
  manifest.status === 'CERTIFIED',
  'Release package not certified'
);

assert(
  manifest.certification.generalAvailability === true,
  'General Availability flag missing'
);

console.log(`Release files checked : ${releaseFiles.length}`);
console.log(`Missing files         : ${missing.length}`);
console.log(`Version              : ${manifest.version}`);
console.log(`Status               : ${manifest.status}`);
console.log('✅ GA-H-F Part 5 — Release Package Certification verified');
