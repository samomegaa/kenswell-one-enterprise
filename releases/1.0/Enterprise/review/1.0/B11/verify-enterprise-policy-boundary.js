const {
  ValidationBoundary,
  ValidationRule,
  validationSuccess,
  validationFailure,
  PolicyBoundary,
  PolicyRule,
  allowPolicy,
  denyPolicy,
  enterpriseValidationPolicyMiddleware,
} = require('../../../src/enterprise/policy');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const validation = new ValidationBoundary('customer.validation');

  validation.addRule(
    'name.required',
    (input) => Boolean(input.name),
    'name is required'
  );

  validation.addRule(
    new ValidationRule(
      'email.required',
      (input) => Boolean(input.email),
      'email is required'
    )
  );

  const validResult = await validation.validate({
    name: 'Kenswell',
    email: 'info@example.com',
  });

  assert(validResult.ok === true, 'valid input should pass');
  assert(Object.isFrozen(validResult), 'validation result should be immutable');

  const invalidResult = await validation.validate({
    name: '',
  });

  assert(invalidResult.ok === false, 'invalid input should fail');
  assert(invalidResult.errors.length === 2, 'validation error count mismatch');

  const explicitValidationSuccess = validationSuccess();
  const explicitValidationFailure = validationFailure([
    { rule: 'manual', message: 'manual failure' },
  ]);

  assert(explicitValidationSuccess.ok === true, 'validationSuccess invalid');
  assert(explicitValidationFailure.ok === false, 'validationFailure invalid');

  const policy = new PolicyBoundary('customer.policy');

  policy.addRule(
    'tenant.active',
    (context) => context.enterpriseContext?.tenant?.status === 'active',
    'tenant is not active'
  );

  policy.addRule(
    new PolicyRule(
      'permission.customer.create',
      (context) => {
        return context.enterpriseContext?.rbac?.permissions?.includes('customer:create');
      },
      'missing customer:create permission'
    )
  );

  const allowedDecision = await policy.evaluate({
    enterpriseContext: {
      tenant: {
        status: 'active',
      },
      rbac: {
        permissions: ['customer:create'],
      },
    },
  });

  assert(allowedDecision.allowed === true, 'policy should allow valid context');
  assert(Object.isFrozen(allowedDecision), 'policy decision should be immutable');

  const deniedDecision = await policy.evaluate({
    enterpriseContext: {
      tenant: {
        status: 'active',
      },
      rbac: {
        permissions: [],
      },
    },
  });

  assert(deniedDecision.allowed === false, 'policy should deny missing permission');

  const explicitAllow = allowPolicy('manual allow');
  const explicitDeny = denyPolicy('manual deny');

  assert(explicitAllow.allowed === true, 'allowPolicy invalid');
  assert(explicitDeny.allowed === false, 'denyPolicy invalid');

  assert(typeof enterpriseValidationPolicyMiddleware === 'function', 'policy middleware not exported');
  assert(core.policy, 'policy not exported from core');
  assert(typeof core.policy.ValidationBoundary === 'function', 'core policy export invalid');
  assert(typeof core.policy.PolicyBoundary === 'function', 'core policy boundary export invalid');

  console.log('✅ Enterprise Validation and Policy Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
