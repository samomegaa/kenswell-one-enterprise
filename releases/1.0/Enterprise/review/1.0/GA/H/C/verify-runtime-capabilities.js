const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const capabilities = {
  composition: [
    'createEnterpriseCompositionRoot',
    'CompositionRegistry',
  ],

  di: [
    'createEnterpriseContainer',
    'EnterpriseContainer',
    'ServiceLifetime',
  ],

  lifecycle: [
    'ModuleLifecycleState',
    'ModuleLifecycleTransition',
    'ModuleLifecycleRegistry',
    'ModuleLifecycleManager',
    'createModuleLifecycleManager',
  ],

  configuration: [
    'ConfigurationProvider',
    'ConfigurationRegistry',
    'ConfigurationSource',
    'ConfigurationSchema',
    'createConfigurationProvider',
  ],

  plugins: [
    'PluginState',
    'PluginTransition',
    'PluginRegistry',
    'PluginLoader',
    'PluginManager',
    'createPluginManager',
  ],

  bootstrap: [
    'PlatformBootstrapState',
    'EnterpriseHost',
    'createEnterpriseHost',
    'createPlatformBootstrap',
  ],
};

const missing = [];

for (const [service, symbols] of Object.entries(capabilities)) {
  assert(core[service], `Missing runtime service: ${service}`);

  for (const symbol of symbols) {
    if (!core[service][symbol]) {
      missing.push(`${service}.${symbol}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing runtime capabilities:\n${missing.join('\n')}`
);

console.log(`Runtime services checked : ${Object.keys(capabilities).length}`);
console.log(`Capabilities checked     : ${Object.values(capabilities).flat().length}`);
console.log(`Missing capabilities     : ${missing.length}`);
console.log('✅ GA-H-C Part 3 — Runtime Capability Review verified');
