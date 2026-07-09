const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const runtimeServices = [
  'composition',
  'di',
  'lifecycle',
  'configuration',
  'plugins',
  'bootstrap',
];

const platformServices = [
  'repository',
  'scheduler',
  'notification',
  'search',
  'integration',
  'ai',
  'operations',
];

const kernelServices = [
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

const allRequired = [
  ...kernelServices,
  ...runtimeServices,
  ...platformServices,
];

const missing = allRequired.filter((name) => !core[name]);

assert(
  missing.length === 0,
  `Missing core platform exports:\n${missing.join('\n')}`
);

console.log(`Kernel services checked   : ${kernelServices.length}`);
console.log(`Runtime services checked  : ${runtimeServices.length}`);
console.log(`Platform services checked : ${platformServices.length}`);
console.log(`Missing services          : ${missing.length}`);
console.log('✅ GA-H-A Part 2 — Enterprise Platform Service Inventory verified');
