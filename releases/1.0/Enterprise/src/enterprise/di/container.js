const { ServiceLifetime } = require('./service-lifetime');
const {
  ServiceRegistrationError,
  ServiceResolutionError,
} = require('./di-errors');

class EnterpriseContainer {
  constructor({ parent = null } = {}) {
    this.parent = parent;
    this.registrations = new Map();
    this.singletons = new Map();
  }

  register(name, factory, options = {}) {
    if (!name || typeof name !== 'string') {
      throw new ServiceRegistrationError('service name is required');
    }

    if (this.registrations.has(name)) {
      throw new ServiceRegistrationError('service already registered', { name });
    }

    const lifetime = options.lifetime || ServiceLifetime.SINGLETON;

    if (!Object.values(ServiceLifetime).includes(lifetime)) {
      throw new ServiceRegistrationError('invalid service lifetime', { name, lifetime });
    }

    if (lifetime !== ServiceLifetime.VALUE && typeof factory !== 'function') {
      throw new ServiceRegistrationError('service factory must be a function', { name });
    }

    const record = Object.freeze({
      name,
      factory,
      lifetime,
      metadata: options.metadata || {},
      registeredAt: new Date().toISOString(),
    });

    this.registrations.set(name, record);
    return record;
  }

  registerValue(name, value, metadata = {}) {
    return this.register(name, value, {
      lifetime: ServiceLifetime.VALUE,
      metadata,
    });
  }

  has(name) {
    return this.registrations.has(name) || Boolean(this.parent && this.parent.has(name));
  }

  resolve(name) {
    if (this.registrations.has(name)) {
      return this.resolveLocal(name);
    }

    if (this.parent) {
      return this.parent.resolve(name);
    }

    throw new ServiceResolutionError('service not registered', { name });
  }

  resolveLocal(name) {
    const record = this.registrations.get(name);

    if (!record) {
      throw new ServiceResolutionError('service not registered', { name });
    }

    if (record.lifetime === ServiceLifetime.VALUE) {
      return record.factory;
    }

    if (record.lifetime === ServiceLifetime.SINGLETON) {
      if (!this.singletons.has(name)) {
        this.singletons.set(name, record.factory(this));
      }

      return this.singletons.get(name);
    }

    return record.factory(this);
  }

  createScope() {
    return new EnterpriseContainer({ parent: this });
  }

  list() {
    return Array.from(this.registrations.values());
  }

  clear() {
    this.registrations.clear();
    this.singletons.clear();
  }
}

function createEnterpriseContainer(options = {}) {
  return new EnterpriseContainer(options);
}

module.exports = {
  EnterpriseContainer,
  createEnterpriseContainer,
};
