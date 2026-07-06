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

const EXPECTED_MODULES = [
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

const modules = listDirectories('src/enterprise');

const missing = EXPECTED_MODULES.filter((moduleName) => {
  return !modules.includes(moduleName);
});

const unexpected = modules.filter((moduleName) => {
  return !EXPECTED_MODULES.includes(moduleName);
});

assert(
  missing.length === 0,
  `Missing enterprise modules: ${missing.join(', ')}`
);

console.log('Expected enterprise modules :', EXPECTED_MODULES.length);
console.log('Found enterprise modules    :', modules.length);
console.log('Missing modules             :', missing.length);
console.log('Unexpected modules          :', unexpected.length);

if (unexpected.length > 0) {
  console.log('Unexpected module names     :', unexpected.join(', '));
}

console.log('✅ RC1-A Part 2 — Enterprise module structure verified');
