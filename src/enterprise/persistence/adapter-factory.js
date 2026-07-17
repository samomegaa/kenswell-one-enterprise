const { PersistenceValidationError } = require('./persistence-errors');

class PersistenceAdapterFactory {
  constructor() { this.builders = new Map(); }

  register(type, builder, { replace = false } = {}) {
    if (!type || typeof builder !== 'function') {
      throw new PersistenceValidationError('Adapter type and builder are required');
    }
    if (this.builders.has(type) && !replace) {
      throw new PersistenceValidationError(`Adapter builder already registered: ${type}`);
    }
    this.builders.set(type, builder);
    return this;
  }

  create(type, options = {}) {
    const builder = this.builders.get(type);
    if (!builder) throw new PersistenceValidationError(`Unknown persistence adapter type: ${type}`);
    return builder(options);
  }

  supports(type) { return this.builders.has(type); }
  list() { return Object.freeze([...this.builders.keys()]); }
}

module.exports = { PersistenceAdapterFactory };
