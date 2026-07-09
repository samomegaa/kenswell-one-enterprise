const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const expectedApis = {
  composition: ['createEnterpriseCompositionRoot'],
  di: ['createEnterpriseContainer'],
  lifecycle: ['createModuleLifecycleManager'],
  configuration: ['createConfigurationProvider'],
  plugins: ['createPluginManager'],
  bootstrap: ['createPlatformBootstrap', 'createEnterpriseHost'],

  repository: ['createRepositoryProvider', 'createRepositorySession'],
  scheduler: ['createEnterpriseScheduler'],
  notification: ['createNotificationProvider'],
  search: ['createSearchProvider'],
  integration: ['createIntegrationProvider'],
  ai: ['createEnterpriseAiService'],
  operations: ['createPlatformOperationsService'],
};

const missing = [];

for (const [service, exports] of Object.entries(expectedApis)) {
  assert(core[service], `Missing service export: ${service}`);

  for (const exportName of exports) {
    if (typeof core[service][exportName] !== 'function') {
      missing.push(`${service}.${exportName}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing public API exports:\n${missing.join('\n')}`
);

console.log(`Platform services checked : ${Object.keys(expectedApis).length}`);
console.log(`Required APIs checked     : ${Object.values(expectedApis).flat().length}`);
console.log(`Missing APIs              : ${missing.length}`);
console.log('✅ GA-H-A Part 3 — Platform Public API verified');
