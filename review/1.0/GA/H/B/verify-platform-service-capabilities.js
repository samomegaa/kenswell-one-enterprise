const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const capabilities = {
  repository: [
    'RepositoryType',
    'RepositoryOperation',
    'EnterpriseRepository',
    'createRepositoryProvider',
    'createRepositorySession',
  ],

  scheduler: [
    'JobState',
    'JobType',
    'EnterpriseJob',
    'createEnterpriseScheduler',
  ],

  notification: [
    'NotificationChannel',
    'NotificationPriority',
    'NotificationStatus',
    'EnterpriseNotification',
    'createNotificationProvider',
  ],

  search: [
    'SearchDocumentType',
    'SearchIndexStatus',
    'SearchDocument',
    'createSearchProvider',
  ],

  integration: [
    'IntegrationProtocol',
    'IntegrationStatus',
    'EnterpriseIntegrationConnector',
    'createIntegrationProvider',
  ],

  ai: [
    'AiCapability',
    'AiProviderStatus',
    'AiRequestType',
    'EnterpriseAiProvider',
    'createEnterpriseAiService',
  ],

  operations: [
    'PlatformOperationType',
    'PlatformOperationStatus',
    'PlatformOperation',
    'createPlatformOperationsService',
  ],
};

const missing = [];

for (const [service, symbols] of Object.entries(capabilities)) {
  assert(core[service], `Missing service: ${service}`);

  for (const symbol of symbols) {
    if (!core[service][symbol]) {
      missing.push(`${service}.${symbol}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing platform service capabilities:\n${missing.join('\n')}`
);

console.log(`Platform services checked : ${Object.keys(capabilities).length}`);
console.log(`Capabilities checked      : ${Object.values(capabilities).flat().length}`);
console.log(`Missing capabilities      : ${missing.length}`);
console.log('✅ GA-H-B Part 3 — Platform Service Capability Review verified');
