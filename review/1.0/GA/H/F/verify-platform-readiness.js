const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const readiness = {
  kernel: [
    'runtime',
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
  ],

  runtime: [
    'composition',
    'di',
    'lifecycle',
    'configuration',
    'plugins',
    'bootstrap',
  ],

  platform: [
    'repository',
    'scheduler',
    'notification',
    'search',
    'integration',
    'ai',
    'operations',
  ],
};

const missing = [];

for (const services of Object.values(readiness)) {
  for (const service of services) {
    if (!core[service]) {
      missing.push(service);
    }
  }
}

assert(
  missing.length === 0,
  `Platform readiness failed:\n${missing.join('\n')}`
);

const totals = {
  kernel: readiness.kernel.length,
  runtime: readiness.runtime.length,
  platform: readiness.platform.length,
};

const overall =
  totals.kernel +
  totals.runtime +
  totals.platform;

console.log(`Kernel services    : ${totals.kernel}`);
console.log(`Runtime services   : ${totals.runtime}`);
console.log(`Platform services  : ${totals.platform}`);
console.log(`Overall readiness  : ${overall}`);
console.log(`Missing services   : ${missing.length}`);
console.log('✅ GA-H-F Part 3 — Enterprise Platform Readiness verified');
