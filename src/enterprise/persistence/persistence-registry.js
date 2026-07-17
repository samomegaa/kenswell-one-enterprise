const { PersistenceValidationError } = require('./persistence-errors');

class PersistenceRegistry {
  constructor() { this.adapters = new Map(); }

  register(name, adapter, { replace = false } = {}) {
    if (!name || !adapter) {
      throw new PersistenceValidationError('Adapter name and instance are required');
    }
    if (this.adapters.has(name) && !replace) {
      throw new PersistenceValidationError(`Persistence adapter already registered: ${name}`);
    }
    this.adapters.set(name, adapter);
    return adapter;
  }

  resolve(name) { return this.adapters.get(name) || null; }

  require(name) {
    const adapter = this.resolve(name);
    if (!adapter) throw new PersistenceValidationError(`Persistence adapter is not registered: ${name}`);
    return adapter;
  }

  has(name) { return this.adapters.has(name); }
  list() { return Object.freeze([...this.adapters.keys()]); }
  unregister(name) { return this.adapters.delete(name); }
}

module.exports = { PersistenceRegistry };
