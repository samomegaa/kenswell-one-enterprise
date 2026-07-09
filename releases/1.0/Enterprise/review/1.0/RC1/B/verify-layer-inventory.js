const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listDirectories(relativePath) {
  const fullPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

const EXPECTED_LAYERS = [
  'api',
  'application',
  'audit',
  'context',
  'cqrs',
  'domain',
  'logging',
  'observability',
  'policy',
  'resilience',
  'security',
  'transactions',
  'workflow',
];

const layers = listDirectories('src/enterprise');

const missing = EXPECTED_LAYERS.filter((layer) => {
  return !layers.includes(layer);
});

assert(
  missing.length === 0,
  `Missing Enterprise layers: ${missing.join(', ')}`
);

console.log('Expected Enterprise layers :', EXPECTED_LAYERS.length);
console.log('Found Enterprise layers    :', layers.length);
console.log('Missing Enterprise layers  :', missing.length);

console.log('✅ RC1-B Part 1 — Enterprise layer inventory verified');
