const {
  buildDeniedAccessFlow,
  createDeniedAccessContext,
  createDeleteCustomerPolicy,
} = require('./denied-access-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildDeniedAccessFlow();

  assert(flow.context, 'context layer missing');
  assert(flow.policy, 'policy layer missing');
  assert(flow.logging, 'logging layer missing');

  const enterpriseContext = createDeniedAccessContext();

  assert(enterpriseContext.auth.authenticated === true, 'user should be authenticated');
  assert(enterpriseContext.rbac.roles.includes('viewer'), 'viewer role missing');
  assert(enterpriseContext.rbac.permissions.includes('customer:read'), 'read permission missing');
  assert(!enterpriseContext.rbac.permissions.includes('customer:delete'), 'delete permission should not exist');

  const policy = createDeleteCustomerPolicy();

  const decision = await policy.evaluate({
    enterpriseContext,
  });

  assert(decision.allowed === false, 'delete policy should deny access');
  assert(decision.reason === 'missing customer:delete permission', 'deny reason mismatch');

  const logger = new flow.logging.EnterpriseLogger({
    provider: new flow.logging.MemoryLoggerProvider(),
  });

  const logEntry = logger.warn('access.denied', {
    enterpriseContext,
    metadata: {
      permission: 'customer:delete',
      reason: decision.reason,
    },
  });

  assert(logEntry.level === flow.logging.LogLevel.WARN, 'denied access log level mismatch');
  assert(logEntry.correlation.tenantId === 'tenant_rc2_b', 'log tenant correlation mismatch');
  assert(logEntry.correlation.actorId === 'user_rc2_b_denied', 'log actor correlation mismatch');

  console.log('✅ RC2-B Part 4 — Denied access flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
