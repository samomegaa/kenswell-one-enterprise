const { DomainOperationError } = require('./domain-errors');
const { domainSuccess, domainFailure } = require('./domain-result');

class DomainOperation {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new DomainOperationError('unknown', new Error('operation name is required'));
    }

    if (typeof handler !== 'function') {
      throw new DomainOperationError(name, new Error('operation handler must be a function'));
    }

    this.name = name;
    this.handler = handler;
  }

  async execute(context = {}) {
    try {
      const result = await this.handler(context);

      if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'ok')) {
        return result;
      }

      return domainSuccess(result, {
        operationName: this.name,
      });
    } catch (error) {
      return domainFailure(new DomainOperationError(this.name, error), {
        operationName: this.name,
      });
    }
  }
}

module.exports = {
  DomainOperation,
};
