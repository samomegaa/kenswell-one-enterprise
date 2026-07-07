const { CompositionRegistryError } = require('./composition-errors');

class CompositionRegistry {
  constructor() {
    this.services = new Map();
  }

  register(name, value, metadata = {}) {
    if (!name || typeof name !== 'string') {
      throw new CompositionRegistryError('service name is required');
    }

    if (this.services.has(name)) {
      throw new CompositionRegistryError('service already registered', { name });
    }

    const record = Object.freeze({
      name,
      value,
      metadata,
      registeredAt: new Date().toISOString(),
    });

    this.services.set(name, record);
    return record;
  }

  has(name) {
    return this.services.has(name);
  }

  get(name) {
    const record = this.services.get(name);

    if (!record) {
      throw new CompositionRegistryError('service not registered', { name });
    }

    return record.value;
  }

  list() {
    return Array.from(this.services.values());
  }

  clear() {
    this.services.clear();
  }
}

const defaultCompositionRegistry = new CompositionRegistry();

module.exports = {
  CompositionRegistry,
  defaultCompositionRegistry,
};
