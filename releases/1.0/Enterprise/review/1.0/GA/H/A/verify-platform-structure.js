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

const requiredPaths = [
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

const missing = requiredPaths.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing platform structure:\n${missing.join('\n')}`
);

console.log(`Platform items checked : ${requiredPaths.length}`);
console.log(`Missing items          : ${missing.length}`);
console.log('✅ GA-H-A Part 1 — Enterprise Platform Structure verified');
