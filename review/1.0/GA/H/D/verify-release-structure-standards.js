const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

const requiredReviewPaths = [
  'review/1.0/GA/A',
  'review/1.0/GA/B',
  'review/1.0/GA/C',
  'review/1.0/GA/D',
  'review/1.0/GA/E',
  'review/1.0/GA/F',
  'review/1.0/GA/G',

  'review/1.0/GA/H/A',
  'review/1.0/GA/H/B',
  'review/1.0/GA/H/C',
  'review/1.0/GA/H/D',
];

const missing = requiredReviewPaths.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing release review paths:\n${missing.join('\n')}`
);

console.log(`Release paths checked : ${requiredReviewPaths.length}`);
console.log(`Missing paths         : ${missing.length}`);
console.log('✅ GA-H-D Part 4 — Release structure standards verified');
