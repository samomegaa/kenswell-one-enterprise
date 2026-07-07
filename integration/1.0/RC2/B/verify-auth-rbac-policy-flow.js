const {
  buildAuthRbacPolicyFlow,
  createAuthRbacContext,
  createCustomerCreatePolicy,
} = require('./auth-rbac-policy-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildAuthRbacPolicyFlow();

  assert(flow.context, 'context layer missing');
  assert(flow.rbac, 'rbac layer missing');
  assert(flow.policy, 'policy layer missing');

  const allowedContext = createAuthRbacContext({
    permissions: ['customer:create', 'customer:read'],
  });

  assert(allowedContext.auth.authenticated === true, 'auth context mismatch');
  assert(allowedContext.rbac.permissions.includes('customer:create'), 'permission missing from context');

  const policy = createCustomerCreatePolicy();

  const allowedDecision = await policy.evaluate({
    enterpriseContext: allowedContext,
  });

  assert(allowedDecision.allowed === true, 'policy should allow customer:create');

  const deniedContext = createAuthRbacContext({
    permissions: ['customer:read'],
  });

  const deniedDecision = await policy.evaluate({
    enterpriseContext: deniedContext,
  });

  assert(deniedDecision.allowed === false, 'policy should deny missing permission');
  assert(deniedDecision.reason === 'missing customer:create permission', 'deny reason mismatch');

  console.log('✅ RC2-B Part 3 — Auth RBAC policy integration verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
