const { DomainServiceError } = require('./domain-errors');
const { DomainOperation } = require('./domain-operation');

class DomainService {
  constructor(name, options = {}) {
    if (!name || typeof name !== 'string') {
      throw new DomainServiceError('domain service name is required');
    }

    this.name = name;
    this.description = options.description || null;
    this.version = options.version || '1.0.0';
    this.operations = new Map();
  }

  registerOperation(name, handler) {
    const operation = handler instanceof DomainOperation
      ? handler
      : new DomainOperation(name, handler);

    this.operations.set(operation.name, operation);
    return this;
  }

  hasOperation(name) {
    return this.operations.has(name);
  }

  getOperation(name) {
    return this.operations.get(name);
  }

  listOperations() {
    return Array.from(this.operations.keys());
  }

  async execute(operationName, context = {}) {
    const operation = this.getOperation(operationName);

    if (!operation) {
      throw new DomainServiceError(`operation not found: ${operationName}`, {
        serviceName: this.name,
        operationName,
      });
    }

    return operation.execute({
      ...context,
      serviceName: this.name,
      operationName,
    });
  }

  describe() {
    return Object.freeze({
      name: this.name,
      description: this.description,
      version: this.version,
      operations: this.listOperations(),
    });
  }
}

module.exports = {
  DomainService,
};
