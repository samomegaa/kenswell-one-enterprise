const {
  ApplicationServiceError,
  ApplicationServiceNotFoundError,
} = require('./application-errors');

class ApplicationServiceRegistry {
  constructor() {
    this.services = new Map();
  }

  register(service) {
    if (!service || !service.name) {
      throw new ApplicationServiceError('valid application service is required');
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
      throw new ApplicationServiceNotFoundError(serviceName);
    }

    return service;
  }

  list() {
    return Array.from(this.services.values()).map((service) => service.describe());
  }

  async execute(serviceName, useCaseName, context = {}) {
    const service = this.get(serviceName);
    return service.execute(useCaseName, context);
  }

  clear() {
    this.services.clear();
  }
}

const defaultApplicationServiceRegistry = new ApplicationServiceRegistry();

module.exports = {
  ApplicationServiceRegistry,
  defaultApplicationServiceRegistry,
};
