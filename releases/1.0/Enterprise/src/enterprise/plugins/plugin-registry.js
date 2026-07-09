const { PluginState } = require('./plugin-state');

const {
  PluginRegistrationError,
  PluginNotFoundError,
} = require('./plugin-errors');

function freezePluginRecord(record) {
  return Object.freeze({
    ...record,
    metadata: Object.freeze({
      ...(record.metadata || {}),
    }),
  });
}

class PluginRegistry {
  constructor() {
    this.plugins = new Map();
  }

  register(pluginDefinition) {
    if (!pluginDefinition || typeof pluginDefinition !== 'object') {
      throw new PluginRegistrationError('plugin definition is required');
    }

    const { name, version } = pluginDefinition;

    if (!name || typeof name !== 'string') {
      throw new PluginRegistrationError('plugin name is required');
    }

    if (!version || typeof version !== 'string') {
      throw new PluginRegistrationError('plugin version is required', { name });
    }

    if (this.plugins.has(name)) {
      throw new PluginRegistrationError('plugin already registered', { name });
    }

    const record = {
      name,
      version,
      definition: pluginDefinition,
      state: PluginState.REGISTERED,
      metadata: pluginDefinition.metadata || {},
      registeredAt: new Date().toISOString(),
      loadedAt: null,
      enabledAt: null,
      disabledAt: null,
      unloadedAt: null,
    };

    this.plugins.set(name, record);
    return freezePluginRecord(record);
  }

  has(name) {
    return this.plugins.has(name);
  }

  get(name) {
    const record = this.plugins.get(name);

    if (!record) {
      throw new PluginNotFoundError('plugin not registered', { name });
    }

    return freezePluginRecord(record);
  }

  updateState(name, state) {
    const record = this.plugins.get(name);

    if (!record) {
      throw new PluginNotFoundError('plugin not registered', { name });
    }

    record.state = state;

    if (state === PluginState.LOADED) {
      record.loadedAt = new Date().toISOString();
    }

    if (state === PluginState.ENABLED) {
      record.enabledAt = new Date().toISOString();
    }

    if (state === PluginState.DISABLED) {
      record.disabledAt = new Date().toISOString();
    }

    if (state === PluginState.UNLOADED) {
      record.unloadedAt = new Date().toISOString();
    }

    return freezePluginRecord(record);
  }

  list() {
    return Array.from(this.plugins.values()).map((record) => {
      return freezePluginRecord(record);
    });
  }

  clear() {
    this.plugins.clear();
  }
}

const defaultPluginRegistry = new PluginRegistry();

module.exports = {
  PluginRegistry,
  defaultPluginRegistry,
};
