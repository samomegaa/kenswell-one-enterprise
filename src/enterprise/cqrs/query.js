const { QueryExecutionError } = require('./cqrs-errors');
const { cqrsSuccess, cqrsFailure } = require('./cqrs-result');

class Query {
  constructor(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new QueryExecutionError('unknown', new Error('query name is required'));
    }

    if (typeof handler !== 'function') {
      throw new QueryExecutionError(name, new Error('query handler must be a function'));
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

      return cqrsSuccess(result, {
        queryName: this.name,
      });
    } catch (error) {
      return cqrsFailure(new QueryExecutionError(this.name, error), {
        queryName: this.name,
      });
    }
  }
}

module.exports = {
  Query,
};
