const {
  buildAuthenticatedIdentityFlow,
  createAuthenticatedIdentity,
} = require('./authenticated-identity-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildAuthenticatedIdentityFlow();

  assert(flow.auth, 'auth layer missing');
  assert(flow.identity, 'identity layer missing');
  assert(flow.context, 'context layer missing');

  const authenticated = createAuthenticatedIdentity({
    userId: 'user_rc2_b_001',
    email: 'integration@example.com',
    provider: 'local',
  });

  assert(authenticated.authenticated === true, 'identity should be authenticated');
  assert(authenticated.provider === 'local', 'provider mismatch');
  assert(authenticated.identity.userId === 'user_rc2_b_001', 'userId mismatch');
  assert(authenticated.identity.email === 'integration@example.com', 'email mismatch');
  assert(Object.isFrozen(authenticated), 'authenticated identity result should be immutable');

  const enterpriseContext = flow.context.createEnterpriseContext({
    tenant: {
      id: 'tenant_rc2_b',
      slug: 'rc2-b',
      name: 'RC2-B Tenant',
    },
    identity: authenticated.identity,
    auth: {
      authenticated: authenticated.authenticated,
      provider: authenticated.provider,
    },
  });

  assert(enterpriseContext.tenant.id === 'tenant_rc2_b', 'tenant context mismatch');
  assert(enterpriseContext.identity.userId === 'user_rc2_b_001', 'identity context mismatch');
  assert(enterpriseContext.auth.authenticated === true, 'auth context mismatch');

  console.log('✅ RC2-B Part 1 — Authenticated identity flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
