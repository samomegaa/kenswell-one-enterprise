const {
  buildApplicationServiceFlow,
  createApplicationExecutionContext,
} = require('./application-service-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildApplicationServiceFlow();

  assert(flow.application, 'application layer missing');
  assert(flow.domain, 'domain layer missing');
  assert(flow.workflow, 'workflow layer missing');
  assert(flow.context, 'context layer missing');

  assert(typeof flow.application.ApplicationService === 'function', 'ApplicationService missing');
  assert(typeof flow.application.ApplicationUseCase === 'function', 'ApplicationUseCase missing');
  assert(typeof flow.application.applicationSuccess === 'function', 'applicationSuccess missing');

  const enterpriseContext = createApplicationExecutionContext();

  assert(enterpriseContext.tenant.id === 'tenant_rc2_c', 'tenant context mismatch');
  assert(enterpriseContext.identity.userId === 'user_rc2_c_001', 'identity context mismatch');
  assert(enterpriseContext.rbac.permissions.includes('customer:create'), 'permission context mismatch');

  const result = flow.application.applicationSuccess({
    customerId: 'customer_rc2_c_001',
    status: 'created',
  });

  assert(result.ok === true, 'application result should be successful');
  assert(result.data.customerId === 'customer_rc2_c_001', 'customerId mismatch');
  assert(Object.isFrozen(result), 'application result should be immutable');

  console.log('✅ RC2-C Part 1 — Application service invocation flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
