const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const REQUIRED_FOUNDATIONS = {
  runtime: 'runtime',
  context: 'context',
  audit: 'audit',
  workflow: 'workflow',
  transactions: 'transactions',
  domain: 'domain',
  application: 'application',
  api: 'api',
  policy: 'policy',
  cqrs: 'cqrs',
  resilience: 'resilience',
  observability: 'observability',
  logging: 'logging',
  security: 'security',
};

const core = require(path.join(ROOT, 'packages/core/src'));

const missing = [];

for (const [name, exportName] of Object.entries(REQUIRED_FOUNDATIONS)) {
  if (!core[exportName]) {
    missing.push(name);
  }
}

assert(
  missing.length === 0,
  `Missing production foundations: ${missing.join(', ')}`
);

console.log('Production foundations checked :', Object.keys(REQUIRED_FOUNDATIONS).length);
console.log('Missing foundations            :', missing.length);
console.log('✅ RC1-F Part 1 — Production foundations verified');
