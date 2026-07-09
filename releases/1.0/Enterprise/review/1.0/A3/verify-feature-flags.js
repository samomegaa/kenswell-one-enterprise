const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  featureFlags: {
    createFeatureFlags,
    FeatureFlags
  }
} = require(path.join(root, 'packages/core/src'));

const flags = createFeatureFlags();

if (!(flags instanceof FeatureFlags)) {
  throw new Error('FeatureFlags not created');
}

if (!flags.enabled('bridge.client_portal')) {
  throw new Error('Bridge client portal should be enabled');
}

if (flags.enabled('analytics.ai')) {
  throw new Error('AI should not yet be enabled');
}

console.log('Enterprise feature flags verified');
console.log(`Enabled: ${flags.listEnabled().length}`);
console.log(`Disabled: ${flags.listDisabled().length}`);
