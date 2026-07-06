const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const EXPECTED_CORE_EXPORTS = [
  'moduleRegistry',
  'featureFlags',
  'events',
  'runtime',
  'tenant',
  'organisation',
  'identity',
  'auth',
  'rbac',

  'context',
  'audit',
  'workflow',
  'transactions',
  'domain',
  'application',
  'api',
  'policy',
  'cqrs',
  'resilience',
  'observability',
  'logging',
  'security',
];

const core = require(path.join(ROOT, 'packages/core/src'));
const exportsFound = Object.keys(core).sort();

const missing = EXPECTED_CORE_EXPORTS.filter((exportName) => {
  return !exportsFound.includes(exportName);
});

const unexpected = exportsFound.filter((exportName) => {
  return !EXPECTED_CORE_EXPORTS.includes(exportName);
});

assert(
  missing.length === 0,
  `Missing core exports: ${missing.join(', ')}`
);

console.log('Expected core exports :', EXPECTED_CORE_EXPORTS.length);
console.log('Found core exports    :', exportsFound.length);
console.log('Missing exports       :', missing.length);
console.log('Unexpected exports    :', unexpected.length);

if (unexpected.length > 0) {
  console.log('Unexpected export names:', unexpected.join(', '));
}

console.log('✅ RC1-A Part 3 — Core public exports verified');
