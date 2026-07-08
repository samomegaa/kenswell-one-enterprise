const {
  ConfigurationRegistry,
} = require('./configuration-registry');

const {
  ConfigurationSource,
} = require('./configuration-sources');

class ConfigurationProvider {
  constructor({
    registry = new ConfigurationRegistry(),
    schema = null,
  } = {}) {
    this.registry = registry;
    this.schema = schema;
  }

  set(key, value, options = {}) {
    return this.registry.set(key, value, options);
  }

  setDefault(key, value, metadata = {}) {
    return this.set(key, value, {
      source: ConfigurationSource.DEFAULT,
      metadata,
    });
  }

  setEnvironment(key, value, metadata = {}) {
    return this.set(key, value, {
      source: ConfigurationSource.ENVIRONMENT,
      metadata,
    });
  }

  get(key, defaultValue) {
    if (arguments.length === 2) {
      return this.registry.get(key, defaultValue);
    }

    return this.registry.get(key);
  }

  has(key) {
    return this.registry.has(key);
  }

  snapshot() {
    return this.registry.snapshot();
  }

  validate() {
    if (!this.schema) {
      return Object.freeze({
        ok: true,
        errors: [],
      });
    }

    return this.schema.validate(this.snapshot());
  }

  list() {
    return this.registry.list();
  }
}

function createConfigurationProvider(options = {}) {
  return new ConfigurationProvider(options);
}

module.exports = {
  ConfigurationProvider,
  createConfigurationProvider,
};
