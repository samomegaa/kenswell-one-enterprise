const crypto = require('crypto');
const { defaultIdempotencyStore } = require('./idempotency-store');
const { IdempotencyError } = require('./resilience-errors');

function createRequestHash(input = {}) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(input))
    .digest('hex');
}

class IdempotencyBoundary {
  constructor(store = defaultIdempotencyStore) {
    this.store = store;
  }

  createKey({
    tenantId,
    actorId,
    operation,
    idempotencyKey,
  } = {}) {
    if (!idempotencyKey) {
      throw new IdempotencyError('idempotencyKey is required');
    }

    return [
      tenantId || 'tenant_unknown',
      actorId || 'actor_unknown',
      operation || 'operation_unknown',
      idempotencyKey,
    ].join(':');
  }

  async execute({
    key,
    input = {},
    metadata = {},
    handler,
  } = {}) {
    if (!key) {
      throw new IdempotencyError('idempotency key is required');
    }

    if (typeof handler !== 'function') {
      throw new IdempotencyError('idempotent handler must be a function');
    }

    const existing = this.store.get(key);
    const requestHash = createRequestHash(input);

    if (existing?.status === 'completed') {
      if (existing.requestHash && existing.requestHash !== requestHash) {
        throw new IdempotencyError('idempotency key reused with different input', {
          key,
        });
      }

      return Object.freeze({
        reused: true,
        record: existing,
        result: existing.result,
      });
    }

    if (existing?.status === 'pending') {
      throw new IdempotencyError('operation already in progress', {
        key,
      });
    }

    this.store.set(key, {
      key,
      requestHash,
      status: 'pending',
      result: null,
      metadata,
      createdAt: new Date().toISOString(),
    });

    try {
      const result = await handler();

      const record = this.store.complete(key, result);

      return Object.freeze({
        reused: false,
        record,
        result,
      });
    } catch (error) {
      this.store.fail(key, error);
      throw error;
    }
  }
}

module.exports = {
  IdempotencyBoundary,
  createRequestHash,
};
