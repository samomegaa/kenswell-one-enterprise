const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtimeExports = {
  composition: [
    'createEnterpriseCompositionRoot',
    'CompositionRegistry',
    'enterpriseCompositionMiddleware',
  ],

  di: [
    'EnterpriseContainer',
    'createEnterpriseContainer',
    'ServiceLifetime',
    'enterpriseDiMiddleware',
  ],

  lifecycle: [
    'ModuleLifecycleState',
    'ModuleLifecycleRegistry',
    'ModuleLifecycleManager',
    'createModuleLifecycleManager',
    'enterpriseModuleLifecycleMiddleware',
  ],

  configuration: [
    'ConfigurationProvider',
    'ConfigurationRegistry',
    'ConfigurationSchema',
    'createConfigurationProvider',
    'enterpriseConfigurationMiddleware',
  ],

  plugins: [
    'PluginRegistry',
    'PluginLoader',
    'PluginManager',
    'createPluginManager',
    'enterprisePluginMiddleware',
  ],

  bootstrap: [
    'EnterpriseHost',
    'createEnterpriseHost',
    'createPlatformBootstrap',
    'enterpriseBootstrapMiddleware',
  ],
};

const missing = [];

for (const [service, symbols] of Object.entries(runtimeExports)) {
  assert(core[service], `Missing runtime service: ${service}`);

  for (const symbol of symbols) {
    if (!core[service][symbol]) {
      missing.push(`${service}.${symbol}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing runtime exports:\n${missing.join('\n')}`
);

console.log(`Runtime services checked : ${Object.keys(runtimeExports).length}`);
console.log(`Required exports checked : ${Object.values(runtimeExports).flat().length}`);
console.log(`Missing exports          : ${missing.length}`);
console.log('✅ GA-H-C Part 2 — Runtime Export Review verified');
