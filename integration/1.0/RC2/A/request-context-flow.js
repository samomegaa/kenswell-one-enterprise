const crypto = require('crypto');

class RequestContextFlow {
  constructor() {
    this.steps = [];
  }

  use(name, handler) {
    if (!name || typeof name !== 'string') {
      throw new Error('flow step name is required');
    }

    if (typeof handler !== 'function') {
      throw new Error('flow handler must be a function');
    }

    this.steps.push({
      name,
      handler,
    });

    return this;
  }

  async execute(initialContext = {}) {
    let context = {
      ...initialContext,
    };

    const completedSteps = [];

    for (const step of this.steps) {
      const update = await step.handler(context);

      if (update && typeof update === 'object') {
        context = {
          ...context,
          ...update,
        };
      }

      completedSteps.push(step.name);
    }

    return Object.freeze({
      ok: true,
      completedSteps,
      context,
    });
  }
}

function createRequestId() {
  return `req_${crypto.randomUUID()}`;
}

function createCorrelationId() {
  return `corr_${crypto.randomUUID()}`;
}

module.exports = {
  RequestContextFlow,
  createRequestId,
  createCorrelationId,
};
