const { ApiControllerError } = require('./api-errors');
const { apiSuccess, apiFailure } = require('./api-response');

class ApiController {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new ApiControllerError('unknown', new Error('controller name is required'));
    }

    if (typeof handler !== 'function') {
      throw new ApiControllerError(name, new Error('controller handler must be a function'));
    }

    this.name = name;
    this.handler = handler;
  }

  async execute(apiRequest) {
    try {
      const result = await this.handler(apiRequest);

      if (result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'ok')) {
        return result;
      }

      return apiSuccess(result, {
        controllerName: this.name,
      });
    } catch (error) {
      return apiFailure(new ApiControllerError(this.name, error), {
        controllerName: this.name,
      });
    }
  }
}

module.exports = {
  ApiController,
};
