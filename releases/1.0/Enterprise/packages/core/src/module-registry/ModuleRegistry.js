class ModuleRegistry {
  constructor({ modules = [] } = {}) {
    this.modules = new Map();

    for (const module of modules) {
      this.register(module);
    }
  }

  register(module) {
    if (!module || !module.id) {
      throw new Error('Module must include an id');
    }

    if (this.modules.has(module.id)) {
      throw new Error(`Module already registered: ${module.id}`);
    }

    this.modules.set(module.id, {
      enabled: false,
      capabilities: [],
      ...module,
    });

    return this.get(module.id);
  }

  get(id) {
    return this.modules.get(id) || null;
  }

  list() {
    return Array.from(this.modules.values());
  }

  enabled() {
    return this.list().filter((module) => module.enabled === true);
  }

  planned() {
    return this.list().filter((module) => module.status === 'planned');
  }

  has(id) {
    return this.modules.has(id);
  }

  hasCapability(capability) {
    return this.list().some((module) =>
      Array.isArray(module.capabilities) &&
      module.capabilities.includes(capability)
    );
  }

  modulesWithCapability(capability) {
    return this.list().filter((module) =>
      Array.isArray(module.capabilities) &&
      module.capabilities.includes(capability)
    );
  }
}

module.exports = ModuleRegistry;
