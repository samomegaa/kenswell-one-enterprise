const {
  MemoryIdempotencyStore,
  defaultIdempotencyStore,
  IdempotencyBoundary,
  IdempotencyError,
  RetryPolicy,
  RetryBoundary,
  createRequestHash,
  enterpriseResilienceMiddleware,
} = require('../../../src/enterprise/resilience');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  defaultIdempotencyStore.clear();

  const store = new MemoryIdempotencyStore();
  store.clear();

  const boundary = new IdempotencyBoundary(store);

  const key = boundary.createKey({
    tenantId: 'tenant_resilience',
    actorId: 'user_resilience',
    operation: 'customer.create',
    idempotencyKey: 'idem_001',
  });

  assert(key.includes('tenant_resilience'), 'idempotency key tenant missing');

  let executionCount = 0;

  const first = await boundary.execute({
    key,
    input: {
      name: 'Kenswell',
    },
    handler: async () => {
      executionCount += 1;
      return {
        id: 'customer_001',
      };
    },
  });

  assert(first.reused === false, 'first execution should not be reused');
  assert(first.result.id === 'customer_001', 'first result mismatch');
  assert(executionCount === 1, 'handler execution count mismatch');

  const second = await boundary.execute({
    key,
    input: {
      name: 'Kenswell',
    },
    handler: async () => {
      executionCount += 1;
      return {
        id: 'customer_002',
      };
    },
  });

  assert(second.reused === true, 'second execution should reuse completed result');
  assert(second.result.id === 'customer_001', 'reused result mismatch');
  assert(executionCount === 1, 'idempotent handler should not execute twice');

  try {
    await boundary.execute({
      key,
      input: {
        name: 'Different',
      },
      handler: async () => ({ id: 'customer_003' }),
    });

    throw new Error('different input should fail');
  } catch (error) {
    assert(error instanceof IdempotencyError, 'wrong idempotency reuse error type');
  }

  const hashA = createRequestHash({ a: 1 });
  const hashB = createRequestHash({ a: 1 });

  assert(hashA === hashB, 'request hash should be deterministic');

  let retryAttempts = 0;

  const retryPolicy = new RetryPolicy({
    maxAttempts: 3,
    delayMs: 0,
  });

  const retryBoundary = new RetryBoundary(retryPolicy);

  const retryResult = await retryBoundary.execute(async () => {
    retryAttempts += 1;

    if (retryAttempts < 3) {
      throw new Error('temporary failure');
    }

    return {
      recovered: true,
    };
  });

  assert(retryResult.ok === true, 'retry should eventually succeed');
  assert(retryResult.attempts === 3, 'retry attempt count mismatch');
  assert(retryResult.result.recovered === true, 'retry result mismatch');

  const failedRetry = await retryBoundary.execute(async () => {
    throw new Error('permanent failure');
  });

  assert(failedRetry.ok === false, 'permanent retry failure should return failure');
  assert(failedRetry.attempts === 3, 'failed retry attempt count mismatch');

  assert(typeof enterpriseResilienceMiddleware === 'function', 'resilience middleware not exported');
  assert(core.resilience, 'resilience not exported from core');
  assert(typeof core.resilience.IdempotencyBoundary === 'function', 'core idempotency export invalid');
  assert(typeof core.resilience.RetryBoundary === 'function', 'core retry export invalid');

  console.log('✅ Enterprise Idempotency and Retry Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
