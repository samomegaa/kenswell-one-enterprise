const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const serviceExports = {
  repository: [
    'EnterpriseRepository',
    'RepositoryProvider',
    'RepositoryRegistry',
    'RepositorySession',
    'createRepositoryProvider',
    'createRepositorySession',
  ],

  scheduler: [
    'EnterpriseJob',
    'EnterpriseScheduler',
    'JobRegistry',
    'createEnterpriseScheduler',
  ],

  notification: [
    'EnterpriseNotification',
    'NotificationProvider',
    'NotificationRegistry',
    'createNotificationProvider',
  ],

  search: [
    'SearchDocument',
    'SearchProvider',
    'SearchIndexRegistry',
    'createSearchProvider',
  ],

  integration: [
    'EnterpriseIntegrationConnector',
    'IntegrationProvider',
    'IntegrationRegistry',
    'createIntegrationProvider',
  ],

  ai: [
    'EnterpriseAiProvider',
    'EnterpriseAiService',
    'AiProviderRegistry',
    'createEnterpriseAiService',
  ],

  operations: [
    'PlatformOperation',
    'PlatformOperationsService',
    'OperationRegistry',
    'createPlatformOperationsService',
  ],
};

const missing = [];

for (const [service, exports] of Object.entries(serviceExports)) {
  assert(core[service], `Missing service: ${service}`);

  for (const exportName of exports) {
    if (!core[service][exportName]) {
      missing.push(`${service}.${exportName}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing platform service exports:\n${missing.join('\n')}`
);

console.log(`Platform services checked : ${Object.keys(serviceExports).length}`);
console.log(`Required exports checked  : ${Object.values(serviceExports).flat().length}`);
console.log(`Missing exports           : ${missing.length}`);
console.log('✅ GA-H-B Part 2 — Platform Service Export Review verified');
