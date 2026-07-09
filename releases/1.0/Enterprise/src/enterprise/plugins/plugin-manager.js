const { PluginState } = require('./plugin-state');
const { PluginRegistry } = require('./plugin-registry');
const { PluginLoader } = require('./plugin-loader');

const {
  PluginTransitionError,
} = require('./plugin-errors');

class PluginManager {
  constructor({
    registry = new PluginRegistry(),
    loader = new PluginLoader(),
    container = null,
    configuration = null,
    lifecycle = null,
    compositionRoot = null,
  } = {}) {
    this.registry = registry;
    this.loader = loader;
    this.container = container;
    this.configuration = configuration;
    this.lifecycle = lifecycle;
    this.compositionRoot = compositionRoot;
  }

  register(pluginDefinition) {
    this.loader.validate(pluginDefinition);
    return this.registry.register(pluginDefinition);
  }

  get(name) {
    return this.registry.get(name);
  }

  list() {
    return this.registry.list();
  }

  createContext(record) {
    return Object.freeze({
      pluginName: record.name,
      version: record.version,
      state: record.state,
      container: this.container,
      configuration: this.configuration,
      lifecycle: this.lifecycle,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
    });
  }

  load(name) {
    const record = this.registry.get(name);

    if (record.state !== PluginState.REGISTERED && record.state !== PluginState.UNLOADED) {
      throw new PluginTransitionError('plugin cannot be loaded from current state', {
        name,
        state: record.state,
      });
    }

    this.loader.load(record.definition, this.createContext(record));

    return this.registry.updateState(name, PluginState.LOADED);
  }

  enable(name) {
    const record = this.registry.get(name);

    if (record.state !== PluginState.LOADED && record.state !== PluginState.DISABLED) {
      throw new PluginTransitionError('plugin cannot be enabled from current state', {
        name,
        state: record.state,
      });
    }

    if (typeof record.definition.enable === 'function') {
      record.definition.enable(this.createContext(record));
    }

    return this.registry.updateState(name, PluginState.ENABLED);
  }

  disable(name) {
    const record = this.registry.get(name);

    if (record.state !== PluginState.ENABLED) {
      throw new PluginTransitionError('plugin cannot be disabled from current state', {
        name,
        state: record.state,
      });
    }

    if (typeof record.definition.disable === 'function') {
      record.definition.disable(this.createContext(record));
    }

    return this.registry.updateState(name, PluginState.DISABLED);
  }

  unload(name) {
    const record = this.registry.get(name);

    if (record.state === PluginState.ENABLED || record.state === PluginState.REGISTERED) {
      throw new PluginTransitionError('plugin cannot be unloaded from current state', {
        name,
        state: record.state,
      });
    }

    if (typeof record.definition.unload === 'function') {
      record.definition.unload(this.createContext(record));
    }

    return this.registry.updateState(name, PluginState.UNLOADED);
  }
}

function createPluginManager(options = {}) {
  return new PluginManager(options);
}

module.exports = {
  PluginManager,
  createPluginManager,
};
