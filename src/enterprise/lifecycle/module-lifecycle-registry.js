const { ModuleLifecycleState } = require('./module-lifecycle-state');

const {
  ModuleRegistrationError,
  ModuleNotFoundError,
} = require('./module-lifecycle-errors');

class ModuleLifecycleRegistry {
  constructor() {
    this.modules = new Map();
  }

  register(moduleDefinition) {
    if (!moduleDefinition || typeof moduleDefinition !== 'object') {
      throw new ModuleRegistrationError('module definition is required');
    }

    const { name } = moduleDefinition;

    if (!name || typeof name !== 'string') {
      throw new ModuleRegistrationError('module name is required');
    }

    if (this.modules.has(name)) {
      throw new ModuleRegistrationError('module already registered', { name });
    }

    const record = {
      name,
      definition: moduleDefinition,
      state: ModuleLifecycleState.REGISTERED,
      registeredAt: new Date().toISOString(),
      initializedAt: null,
      startedAt: null,
      stoppedAt: null,
      disposedAt: null,
      metadata: moduleDefinition.metadata || {},
    };

    this.modules.set(name, record);
    return Object.freeze({ ...record });
  }

  has(name) {
    return this.modules.has(name);
  }

  get(name) {
    const record = this.modules.get(name);

    if (!record) {
      throw new ModuleNotFoundError('module not registered', { name });
    }

    return Object.freeze({ ...record });
  }

  updateState(name, state) {
    const record = this.modules.get(name);

    if (!record) {
      throw new ModuleNotFoundError('module not registered', { name });
    }

    record.state = state;

    if (state === ModuleLifecycleState.INITIALIZED) {
      record.initializedAt = new Date().toISOString();
    }

    if (state === ModuleLifecycleState.STARTED) {
      record.startedAt = new Date().toISOString();
    }

    if (state === ModuleLifecycleState.STOPPED) {
      record.stoppedAt = new Date().toISOString();
    }

    if (state === ModuleLifecycleState.DISPOSED) {
      record.disposedAt = new Date().toISOString();
    }

    return Object.freeze({ ...record });
  }

  list() {
    return Array.from(this.modules.values()).map((record) => {
      return Object.freeze({ ...record });
    });
  }

  clear() {
    this.modules.clear();
  }
}

const defaultModuleLifecycleRegistry = new ModuleLifecycleRegistry();

module.exports = {
  ModuleLifecycleRegistry,
  defaultModuleLifecycleRegistry,
};
