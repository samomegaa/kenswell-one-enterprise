const { ApplicationUseCaseError } = require('./application-errors');
const { applicationSuccess, applicationFailure } = require('./application-result');

class ApplicationUseCase {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new ApplicationUseCaseError('unknown', new Error('use case name is required'));
    }

    if (typeof handler !== 'function') {
      throw new ApplicationUseCaseError(name, new Error('use case handler must be a function'));
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

      return applicationSuccess(result, {
        useCaseName: this.name,
      });
    } catch (error) {
      return applicationFailure(new ApplicationUseCaseError(this.name, error), {
        useCaseName: this.name,
      });
    }
  }
}

module.exports = {
  ApplicationUseCase,
};
