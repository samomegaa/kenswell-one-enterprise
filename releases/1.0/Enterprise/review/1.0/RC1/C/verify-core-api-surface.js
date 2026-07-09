const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const EXPECTED_CORE_API = [
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
const exposed = Object.keys(core).sort();

const missing = EXPECTED_CORE_API.filter((name) => {
  return !exposed.includes(name);
});

const unexpected = exposed.filter((name) => {
  return !EXPECTED_CORE_API.includes(name);
});

assert(
  missing.length === 0,
  `Missing core API exports: ${missing.join(', ')}`
);

assert(
  unexpected.length === 0,
  `Unexpected core API exports: ${unexpected.join(', ')}`
);

console.log('Expected core API exports :', EXPECTED_CORE_API.length);
console.log('Actual core API exports   :', exposed.length);
console.log('Missing exports           :', missing.length);
console.log('Unexpected exports        :', unexpected.length);

console.log('✅ RC1-C Part 1 — Core API surface verified');
