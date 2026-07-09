const path = require('path');

const root = path.resolve(__dirname, '../../..');

const {
  runtime: {
    EnterpriseRuntime,
    createEnterpriseRuntime,
  },
} = require(path.join(root, 'packages/core/src'));

const runtime = createEnterpriseRuntime();

if (!(runtime instanceof EnterpriseRuntime)) {
  throw new Error('Enterprise runtime not created');
}

const summary = runtime.summary();

if (summary.enabledModules !== 1) {
  throw new Error('Expected Bridge to be the only enabled module');
}

if (summary.modules < 5) {
  throw new Error('Expected Enterprise modules to be registered');
}

if (!runtime.featureEnabled('bridge.client_portal')) {
  throw new Error('Bridge client portal feature should be enabled');
}

console.log('Enterprise Runtime verified');
console.log(summary);
