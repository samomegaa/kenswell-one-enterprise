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

const REQUIRED_ITEMS = [
  'package.json',

  'packages',
  'packages/core',
  'packages/core/src',
  'packages/core/src/index.js',

  'src',
  'src/enterprise',

  'review',
  'review/1.0',

  'docs',
  'docs/enterprise',
];

const missing = REQUIRED_ITEMS.filter((item) => !exists(item));

assert(
  missing.length === 0,
  `Missing repository items: ${missing.join(', ')}`
);

console.log('Repository items checked :', REQUIRED_ITEMS.length);
console.log('Missing items           :', missing.length);

console.log('✅ RC1-A Part 1 — Repository structure verified');
