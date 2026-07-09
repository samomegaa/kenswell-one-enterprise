const { ConfigurationSource } = require('./configuration-sources');

const {
  ConfigurationNotFoundError,
  ConfigurationValidationError,
} = require('./configuration-errors');

function cloneValue(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  return JSON.parse(JSON.stringify(value));
}

function freezeRecord(record) {
  return Object.freeze({
    ...record,
    value: cloneValue(record.value),
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class ConfigurationRegistry {
  constructor() {
    this.values = new Map();
  }

  set(key, value, options = {}) {
    if (!key || typeof key !== 'string') {
      throw new ConfigurationValidationError('configuration key is required');
    }

    const source = options.source || ConfigurationSource.MEMORY;

    if (!Object.values(ConfigurationSource).includes(source)) {
      throw new ConfigurationValidationError('invalid configuration source', {
        key,
        source,
      });
    }

    const record = {
      key,
      value: cloneValue(value),
      source,
      metadata: options.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.values.set(key, record);
    return freezeRecord(record);
  }

  has(key) {
    return this.values.has(key);
  }

  get(key, defaultValue) {
    const record = this.values.get(key);

    if (!record) {
      if (arguments.length === 2) {
        return defaultValue;
      }

      throw new ConfigurationNotFoundError('configuration key not found', {
        key,
      });
    }

    return cloneValue(record.value);
  }

  getRecord(key) {
    const record = this.values.get(key);

    if (!record) {
      throw new ConfigurationNotFoundError('configuration key not found', {
        key,
      });
    }

    return freezeRecord(record);
  }

  remove(key) {
    return this.values.delete(key);
  }

  list() {
    return Array.from(this.values.values()).map((record) => {
      return freezeRecord(record);
    });
  }

  snapshot() {
    const snapshot = {};

    for (const [key, record] of this.values.entries()) {
      snapshot[key] = cloneValue(record.value);
    }

    return Object.freeze(snapshot);
  }

  clear() {
    this.values.clear();
  }
}

const defaultConfigurationRegistry = new ConfigurationRegistry();

module.exports = {
  ConfigurationRegistry,
  defaultConfigurationRegistry,
};
