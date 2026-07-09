const { ApplicationServiceError } = require('./application-errors');
const { ApplicationUseCase } = require('./application-use-case');

class ApplicationService {
  constructor(name, options = {}) {
    if (!name || typeof name !== 'string') {
      throw new ApplicationServiceError('application service name is required');
    }

    this.name = name;
    this.description = options.description || null;
    this.version = options.version || '1.0.0';
    this.useCases = new Map();
  }

  registerUseCase(name, handler) {
    const useCase = handler instanceof ApplicationUseCase
      ? handler
      : new ApplicationUseCase(name, handler);

    this.useCases.set(useCase.name, useCase);
    return this;
  }

  hasUseCase(name) {
    return this.useCases.has(name);
  }

  getUseCase(name) {
    return this.useCases.get(name);
  }

  listUseCases() {
    return Array.from(this.useCases.keys());
  }

  async execute(useCaseName, context = {}) {
    const useCase = this.getUseCase(useCaseName);

    if (!useCase) {
      throw new ApplicationServiceError(`use case not found: ${useCaseName}`, {
        serviceName: this.name,
        useCaseName,
      });
    }

    return useCase.execute({
      ...context,
      applicationServiceName: this.name,
      useCaseName,
    });
  }

  describe() {
    return Object.freeze({
      name: this.name,
      description: this.description,
      version: this.version,
      useCases: this.listUseCases(),
    });
  }
}

module.exports = {
  ApplicationService,
};
