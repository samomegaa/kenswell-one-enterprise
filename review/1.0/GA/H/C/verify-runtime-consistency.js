const core = require('../../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const consistency = {
  composition: {
    registry: 'CompositionRegistry',
    middleware: 'enterpriseCompositionMiddleware',
  },

  di: {
    provider: 'EnterpriseContainer',
    middleware: 'enterpriseDiMiddleware',
  },

  lifecycle: {
    registry: 'ModuleLifecycleRegistry',
    provider: 'ModuleLifecycleManager',
    middleware: 'enterpriseModuleLifecycleMiddleware',
  },

  configuration: {
    registry: 'ConfigurationRegistry',
    provider: 'ConfigurationProvider',
    middleware: 'enterpriseConfigurationMiddleware',
  },

  plugins: {
    registry: 'PluginRegistry',
    provider: 'PluginManager',
    middleware: 'enterprisePluginMiddleware',
  },

  bootstrap: {
    provider: 'EnterpriseHost',
    middleware: 'enterpriseBootstrapMiddleware',
  },
};

const missing = [];

for (const [service, expected] of Object.entries(consistency)) {
  assert(core[service], `Missing runtime service: ${service}`);

  for (const [role, exportName] of Object.entries(expected)) {
    if (!core[service][exportName]) {
      missing.push(`${service}.${role}:${exportName}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing runtime consistency exports:\n${missing.join('\n')}`
);

const roleCount = Object.values(consistency).reduce((total, item) => {
  return total + Object.keys(item).length;
}, 0);

console.log(`Runtime services checked : ${Object.keys(consistency).length}`);
console.log(`Consistency roles checked: ${roleCount}`);
console.log(`Missing consistency items: ${missing.length}`);
console.log('✅ GA-H-C Part 4 — Runtime Consistency Review verified');
