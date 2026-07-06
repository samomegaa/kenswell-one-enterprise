const { defaultRetryPolicy } = require('./retry-policy');
const { RetryBoundaryError } = require('./resilience-errors');

class RetryBoundary {
  constructor(policy = defaultRetryPolicy) {
    this.policy = policy;
  }

  async execute(handler, context = {}) {
    if (typeof handler !== 'function') {
      throw new RetryBoundaryError('retry handler must be a function');
    }

    let attempt = 0;
    let lastError = null;

    while (attempt < this.policy.maxAttempts) {
      attempt += 1;

      try {
        const result = await handler({
          ...context,
          attempt,
        });

        return Object.freeze({
          ok: true,
          attempts: attempt,
          result,
        });
      } catch (error) {
        lastError = error;

        if (!this.policy.shouldRetry(error, attempt)) {
          break;
        }

        await this.policy.wait();
      }
    }

    return Object.freeze({
      ok: false,
      attempts: attempt,
      error: {
        name: lastError?.name || 'Error',
        message: lastError?.message || String(lastError),
      },
    });
  }
}

module.exports = {
  RetryBoundary,
};
