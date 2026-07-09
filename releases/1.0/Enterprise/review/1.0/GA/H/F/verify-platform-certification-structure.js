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

const certificationPackages = [
  'review/1.0/GA/H/A',
  'review/1.0/GA/H/B',
  'review/1.0/GA/H/C',
  'review/1.0/GA/H/D',
  'review/1.0/GA/H/E',
  'review/1.0/GA/H/F',
];

const missing = certificationPackages.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing certification packages:\n${missing.join('\n')}`
);

console.log(`Certification packages checked : ${certificationPackages.length}`);
console.log(`Missing packages               : ${missing.length}`);
console.log('✅ GA-H-F Part 1 — Enterprise Platform Certification Structure verified');
