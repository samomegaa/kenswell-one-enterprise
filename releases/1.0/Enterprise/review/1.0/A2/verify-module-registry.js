const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'packages/core/README.md',
  'packages/core/src/index.js',
  'packages/core/src/module-registry/index.js',
  'packages/core/src/module-registry/ModuleRegistry.js',
  'packages/core/src/module-registry/createModuleRegistry.js',
  'packages/core/src/module-registry/modules.json',
  'review/1.0/A2/ENTERPRISE-MODULE-REGISTRY.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing Enterprise module registry file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Enterprise module registry file is empty: ${file}`);
  }
}

const {
  moduleRegistry: {
    createModuleRegistry,
    ModuleRegistry,
  },
} = require(path.join(root, 'packages/core/src'));

if (typeof createModuleRegistry !== 'function') {
  throw new Error('createModuleRegistry export missing');
}

if (typeof ModuleRegistry !== 'function') {
  throw new Error('ModuleRegistry export missing');
}

const registry = createModuleRegistry();

if (!registry.has('bridge')) {
  throw new Error('Bridge module is not registered');
}

const bridge = registry.get('bridge');

if (!bridge.enabled) {
  throw new Error('Bridge module should be enabled');
}

if (bridge.status !== 'stable') {
  throw new Error('Bridge module should be stable');
}

if (!registry.hasCapability('client_portal')) {
  throw new Error('Bridge client_portal capability missing');
}

if (registry.enabled().length !== 1) {
  throw new Error('Only Bridge should be enabled at A2');
}

if (registry.planned().length < 3) {
  throw new Error('Expected planned Enterprise modules');
}

console.log('Enterprise module registry verified');
console.log(`Modules registered: ${registry.list().length}`);
console.log(`Enabled modules: ${registry.enabled().length}`);
