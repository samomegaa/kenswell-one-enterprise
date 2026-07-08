const {
  PluginState,
  PluginTransition,
  PluginRegistry,
  PluginLoader,
  PluginManager,
  createPluginManager,
  enterprisePluginMiddleware,
  PluginRegistrationError,
  PluginNotFoundError,
  PluginTransitionError,
  PluginValidationError,
} = require('../../../../src/enterprise/plugins');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const events = [];

const registry = new PluginRegistry();
const loader = new PluginLoader();

const manager = createPluginManager({
  registry,
  loader,
  container: { name: 'test.container' },
  configuration: { name: 'test.configuration' },
  lifecycle: { name: 'test.lifecycle' },
  compositionRoot: { name: 'test.composition' },
});

assert(manager instanceof PluginManager, 'manager factory invalid');

const registered = manager.register({
  name: 'verification.plugin',
  version: '1.0.0',
  metadata: { type: 'verification' },
  initialize(context) {
    events.push(`initialize:${context.pluginName}`);
  },
  enable(context) {
    events.push(`enable:${context.pluginName}`);
  },
  disable(context) {
    events.push(`disable:${context.pluginName}`);
  },
  unload(context) {
    events.push(`unload:${context.pluginName}`);
  },
});

assert(registered.state === PluginState.REGISTERED, 'initial plugin state invalid');
assert(manager.get('verification.plugin').name === 'verification.plugin', 'registered plugin not found');

const loaded = manager.load('verification.plugin');
assert(loaded.state === PluginState.LOADED, 'load transition failed');

const enabled = manager.enable('verification.plugin');
assert(enabled.state === PluginState.ENABLED, 'enable transition failed');

const disabled = manager.disable('verification.plugin');
assert(disabled.state === PluginState.DISABLED, 'disable transition failed');

const reenabled = manager.enable('verification.plugin');
assert(reenabled.state === PluginState.ENABLED, 're-enable transition failed');

manager.disable('verification.plugin');

const unloaded = manager.unload('verification.plugin');
assert(unloaded.state === PluginState.UNLOADED, 'unload transition failed');

assert(events.includes('initialize:verification.plugin'), 'initialize hook not called');
assert(events.includes('enable:verification.plugin'), 'enable hook not called');
assert(events.includes('disable:verification.plugin'), 'disable hook not called');
assert(events.includes('unload:verification.plugin'), 'unload hook not called');

try {
  manager.enable('verification.plugin');
  throw new Error('unloaded plugin should not enable');
} catch (error) {
  assert(error instanceof PluginTransitionError, 'wrong unloaded transition error');
}

try {
  manager.register({
    name: 'verification.plugin',
    version: '1.0.1',
  });
  throw new Error('duplicate plugin registration should fail');
} catch (error) {
  assert(error instanceof PluginRegistrationError, 'wrong duplicate registration error');
}

try {
  manager.get('missing.plugin');
  throw new Error('missing plugin lookup should fail');
} catch (error) {
  assert(error instanceof PluginNotFoundError, 'wrong missing plugin error');
}

try {
  loader.validate({
    name: 'bad.plugin',
  });
  throw new Error('invalid plugin should fail validation');
} catch (error) {
  assert(error instanceof PluginValidationError, 'wrong validation error');
}

assert(PluginTransition.ENABLE === 'enable', 'plugin transition enum invalid');
assert(typeof enterprisePluginMiddleware === 'function', 'plugin middleware not exported');

assert(core.plugins, 'plugins not exported from core');
assert(typeof core.plugins.createPluginManager === 'function', 'core plugins export invalid');

console.log('✅ Enterprise Plugin Framework verification passed');
