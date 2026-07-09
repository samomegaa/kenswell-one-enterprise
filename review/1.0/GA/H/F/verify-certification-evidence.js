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

const evidence = [
  // RC1
  'review/1.0/RC1/CERTIFICATION/RC1-CERTIFICATION.md',
  'review/1.0/RC1/CERTIFICATION/kernel-score.json',
  'review/1.0/RC1/CERTIFICATION/kernel-status.json',

  // GA-H Reviews
  'review/1.0/GA/H/A',
  'review/1.0/GA/H/B',
  'review/1.0/GA/H/C',
  'review/1.0/GA/H/D',
  'review/1.0/GA/H/E',
  'review/1.0/GA/H/F',

  // Platform documentation
  'docs/enterprise',

  // Enterprise source
  'src/enterprise',
];

const missing = evidence.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing certification evidence:\n${missing.join('\n')}`
);

console.log(`Evidence items checked : ${evidence.length}`);
console.log(`Missing evidence       : ${missing.length}`);
console.log('✅ GA-H-F Part 2 — Certification Evidence verified');
