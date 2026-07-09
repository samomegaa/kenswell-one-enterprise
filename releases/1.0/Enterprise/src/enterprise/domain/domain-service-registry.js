const { DomainServiceNotFoundError, DomainServiceError } = require('./domain-errors');

class DomainServiceRegistry {
  constructor() {
    this.services = new Map();
  }

  register(service) {
    if (!service || !service.name) {
      throw new DomainServiceError('valid domain service is required');
    }

    this.services.set(service.name, service);
    return service;
  }

  has(serviceName) {
    return this.services.has(serviceName);
  }

  get(serviceName) {
    const service = this.services.get(serviceName);

    if (!service) {
      throw new DomainServiceNotFoundError(serviceName);
    }

    return service;
  }

  list() {
    return Array.from(this.services.values()).map((service) => service.describe());
  }

  async execute(serviceName, operationName, context = {}) {
    const service = this.get(serviceName);
    return service.execute(operationName, context);
  }

  clear() {
    this.services.clear();
  }
}

const defaultDomainServiceRegistry = new DomainServiceRegistry();

module.exports = {
  DomainServiceRegistry,
  defaultDomainServiceRegistry,
};
