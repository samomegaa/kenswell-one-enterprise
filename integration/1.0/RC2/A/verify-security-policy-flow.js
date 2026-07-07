const { buildSecurityPolicyFlow } = require('./security-policy-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildSecurityPolicyFlow();

  assert(flow.headers['x-content-type-options'] === 'nosniff', 'security headers missing');

  const runtimeDecision = await flow.runtimeGuard.evaluate({
    runtime: {
      enabled: true,
    },
  });

  assert(runtimeDecision.allowed === true, 'runtime guard should allow enabled runtime');

  const requestDecision = await flow.requestGuard.evaluate({
    method: 'POST',
  });

  assert(requestDecision.allowed === true, 'request guard should allow POST');

  const validationResult = await flow.validation.validate({
    body: {
      name: 'Kenswell Customer',
    },
  });

  assert(validationResult.ok === true, 'validation should pass valid body');

  const policyDecision = await flow.policy.evaluate({
    enterpriseContext: {
      rbac: {
        permissions: ['customer:create'],
      },
    },
  });

  assert(policyDecision.allowed === true, 'policy should allow permissioned context');

  const deniedRequest = await flow.requestGuard.evaluate({
    method: 'TRACE',
  });

  assert(deniedRequest.allowed === false, 'request guard should deny TRACE');

  const failedValidation = await flow.validation.validate({
    body: {},
  });

  assert(failedValidation.ok === false, 'validation should fail missing name');

  const deniedPolicy = await flow.policy.evaluate({
    enterpriseContext: {
      rbac: {
        permissions: [],
      },
    },
  });

  assert(deniedPolicy.allowed === false, 'policy should deny missing permission');

  console.log('✅ RC2-A Part 3 — Security to policy flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
