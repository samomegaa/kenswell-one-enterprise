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

const requiredItems = [
  // Runtime
  'src/enterprise/composition',
  'src/enterprise/di',
  'src/enterprise/lifecycle',
  'src/enterprise/configuration',
  'src/enterprise/plugins',
  'src/enterprise/bootstrap',

  // Platform Services
  'src/enterprise/repository',
  'src/enterprise/scheduler',
  'src/enterprise/notification',
  'src/enterprise/search',
  'src/enterprise/integration',
  'src/enterprise/ai',
  'src/enterprise/operations',

  // Documentation
  'docs/enterprise',

  // Reviews
  'review/1.0',
];

const missing = requiredItems.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing production foundations:\n${missing.join('\n')}`
);

console.log(`Production foundations checked : ${requiredItems.length}`);
console.log(`Missing foundations            : ${missing.length}`);
console.log('✅ GA-H-E Part 1 — Production foundations verified');
