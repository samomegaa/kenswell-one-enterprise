const {
  ConfigurationProvider,
  createConfigurationProvider,
  ConfigurationRegistry,
  ConfigurationSchema,
  createConfigurationSchema,
  ConfigurationSource,
  enterpriseConfigurationMiddleware,
  ConfigurationNotFoundError,
  ConfigurationValidationError,
} = require('../../../../src/enterprise/configuration');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const registry = new ConfigurationRegistry();

const schema = createConfigurationSchema({
  'app.name': {
    required: true,
    type: 'string',
  },
  'app.port': {
    required: true,
    type: 'number',
  },
});

assert(schema instanceof ConfigurationSchema, 'schema factory invalid');

const provider = createConfigurationProvider({
  registry,
  schema,
});

assert(provider instanceof ConfigurationProvider, 'provider factory invalid');

provider.setDefault('app.name', 'Kenswell One');
provider.setEnvironment('app.port', 3000, {
  environment: 'test',
});

assert(provider.has('app.name'), 'app.name should exist');
assert(provider.get('app.name') === 'Kenswell One', 'app.name mismatch');
assert(provider.get('app.port') === 3000, 'app.port mismatch');
assert(provider.get('missing.key', 'fallback') === 'fallback', 'default fallback failed');

const appNameRecord = registry.getRecord('app.name');

assert(appNameRecord.source === ConfigurationSource.DEFAULT, 'default source mismatch');
assert(Object.isFrozen(appNameRecord), 'configuration record should be frozen');

const snapshot = provider.snapshot();

assert(Object.isFrozen(snapshot), 'configuration snapshot should be frozen');
assert(snapshot['app.name'] === 'Kenswell One', 'snapshot app.name mismatch');
assert(snapshot['app.port'] === 3000, 'snapshot app.port mismatch');

const validation = provider.validate();

assert(validation.ok === true, 'configuration validation failed');

try {
  provider.get('missing.key');
  throw new Error('missing configuration key should fail');
} catch (error) {
  assert(error instanceof ConfigurationNotFoundError, 'wrong missing configuration error');
}

try {
  createConfigurationProvider({
    registry: new ConfigurationRegistry(),
    schema,
  }).validate();

  throw new Error('schema validation should fail');
} catch (error) {
  assert(error instanceof ConfigurationValidationError, 'wrong schema validation error');
}

try {
  registry.set('', true);
  throw new Error('empty key should fail');
} catch (error) {
  assert(error instanceof ConfigurationValidationError, 'wrong empty key error');
}

assert(typeof enterpriseConfigurationMiddleware === 'function', 'configuration middleware not exported');

assert(core.configuration, 'configuration not exported from core');
assert(typeof core.configuration.createConfigurationProvider === 'function', 'core configuration export invalid');

console.log('✅ Enterprise Configuration Provider verification passed');
