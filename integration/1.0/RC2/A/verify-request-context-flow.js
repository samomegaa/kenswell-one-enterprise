const {
  RequestContextFlow,
  createRequestId,
  createCorrelationId,
} = require('./request-context-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = new RequestContextFlow();

  flow
    .use('request-id', async () => ({
      requestId: createRequestId(),
    }))
    .use('correlation-id', async () => ({
      correlationId: createCorrelationId(),
    }))
    .use('tenant', async () => ({
      tenant: {
        id: 'tenant_demo',
      },
    }))
    .use('identity', async () => ({
      identity: {
        userId: 'user_demo',
      },
    }));

  const result = await flow.execute();

  assert(result.ok === true, 'flow failed');

  assert(
    result.context.requestId.startsWith('req_'),
    'requestId invalid'
  );

  assert(
    result.context.correlationId.startsWith('corr_'),
    'correlationId invalid'
  );

  assert(
    result.context.tenant.id === 'tenant_demo',
    'tenant missing'
  );

  assert(
    result.context.identity.userId === 'user_demo',
    'identity missing'
  );

  assert(
    result.completedSteps.length === 4,
    'step count mismatch'
  );

  assert(
    Object.isFrozen(result),
    'result should be immutable'
  );

  console.log('✅ RC2-A Part 2 — Request context flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
