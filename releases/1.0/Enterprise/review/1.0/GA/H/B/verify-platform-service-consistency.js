const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const serviceConsistency = {
  repository: {
    provider: 'RepositoryProvider',
    registry: 'RepositoryRegistry',
    middleware: 'enterpriseRepositoryMiddleware',
  },
  scheduler: {
    provider: 'EnterpriseScheduler',
    registry: 'JobRegistry',
    middleware: 'enterpriseSchedulerMiddleware',
  },
  notification: {
    provider: 'NotificationProvider',
    registry: 'NotificationRegistry',
    middleware: 'enterpriseNotificationMiddleware',
  },
  search: {
    provider: 'SearchProvider',
    registry: 'SearchIndexRegistry',
    middleware: 'enterpriseSearchMiddleware',
  },
  integration: {
    provider: 'IntegrationProvider',
    registry: 'IntegrationRegistry',
    middleware: 'enterpriseIntegrationMiddleware',
  },
  ai: {
    provider: 'EnterpriseAiService',
    registry: 'AiProviderRegistry',
    middleware: 'enterpriseAiMiddleware',
  },
  operations: {
    provider: 'PlatformOperationsService',
    registry: 'OperationRegistry',
    middleware: 'enterpriseOperationsMiddleware',
  },
};

const missing = [];

for (const [service, expected] of Object.entries(serviceConsistency)) {
  assert(core[service], `Missing service: ${service}`);

  for (const [role, exportName] of Object.entries(expected)) {
    if (!core[service][exportName]) {
      missing.push(`${service}.${role}:${exportName}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing service consistency exports:\n${missing.join('\n')}`
);

console.log(`Platform services checked : ${Object.keys(serviceConsistency).length}`);
console.log(`Consistency roles checked : ${Object.keys(serviceConsistency).length * 3}`);
console.log(`Missing consistency items : ${missing.length}`);
console.log('✅ GA-H-B Part 4 — Platform Service Consistency Review verified');
