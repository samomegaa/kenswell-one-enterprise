const { ModuleLifecycleState } = require('./module-lifecycle-state');
const { ModuleLifecycleRegistry } = require('./module-lifecycle-registry');
const { ModuleLifecycleTransitionError } = require('./module-lifecycle-errors');

class ModuleLifecycleManager {
  constructor({ registry = new ModuleLifecycleRegistry(), container = null, compositionRoot = null } = {}) {
    this.registry = registry;
    this.container = container;
    this.compositionRoot = compositionRoot;
  }

  register(moduleDefinition) {
    return this.registry.register(moduleDefinition);
  }

  get(name) {
    return this.registry.get(name);
  }

  list() {
    return this.registry.list();
  }

  createContext(record) {
    return Object.freeze({
      moduleName: record.name,
      state: record.state,
      container: this.container,
      compositionRoot: this.compositionRoot,
      metadata: record.metadata || {},
    });
  }

  async initialize(name) {
    const record = this.registry.get(name);

    if (record.state !== ModuleLifecycleState.REGISTERED) {
      throw new ModuleLifecycleTransitionError('module cannot be initialized from current state', { name, state: record.state });
    }

    if (typeof record.definition.initialize === 'function') {
      await record.definition.initialize(this.createContext(record));
    }

    return this.registry.updateState(name, ModuleLifecycleState.INITIALIZED);
  }

  async start(name) {
    const record = this.registry.get(name);

    if (record.state !== ModuleLifecycleState.INITIALIZED && record.state !== ModuleLifecycleState.STOPPED) {
      throw new ModuleLifecycleTransitionError('module cannot be started from current state', { name, state: record.state });
    }

    if (typeof record.definition.start === 'function') {
      await record.definition.start(this.createContext(record));
    }

    return this.registry.updateState(name, ModuleLifecycleState.STARTED);
  }

  async stop(name) {
    const record = this.registry.get(name);

    if (record.state !== ModuleLifecycleState.STARTED) {
      throw new ModuleLifecycleTransitionError('module cannot be stopped from current state', { name, state: record.state });
    }

    if (typeof record.definition.stop === 'function') {
      await record.definition.stop(this.createContext(record));
    }

    return this.registry.updateState(name, ModuleLifecycleState.STOPPED);
  }

  async dispose(name) {
    const record = this.registry.get(name);

    if (record.state === ModuleLifecycleState.STARTED || record.state === ModuleLifecycleState.DISPOSED) {
      throw new ModuleLifecycleTransitionError('module cannot be disposed from current state', { name, state: record.state });
    }

    if (typeof record.definition.dispose === 'function') {
      await record.definition.dispose(this.createContext(record));
    }

    return this.registry.updateState(name, ModuleLifecycleState.DISPOSED);
  }
}

function createModuleLifecycleManager(options = {}) {
  return new ModuleLifecycleManager(options);
}

module.exports = {
  ModuleLifecycleManager,
  createModuleLifecycleManager,
};
