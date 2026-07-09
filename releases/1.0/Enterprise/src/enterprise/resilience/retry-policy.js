class RetryPolicy {
  constructor({
    maxAttempts = 3,
    delayMs = 0,
    retryable = () => true,
  } = {}) {
    this.maxAttempts = maxAttempts;
    this.delayMs = delayMs;
    this.retryable = retryable;
  }

  shouldRetry(error, attempt) {
    return attempt < this.maxAttempts && this.retryable(error);
  }

  async wait() {
    if (!this.delayMs) return;

    await new Promise((resolve) => setTimeout(resolve, this.delayMs));
  }
}

const defaultRetryPolicy = new RetryPolicy();

module.exports = {
  RetryPolicy,
  defaultRetryPolicy,
};
