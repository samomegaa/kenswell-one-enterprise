const {
  createSecurityHeaders,
  RuntimeGuard,
  RequestGuard,
} = require('../../../../src/enterprise/security');

const {
  ValidationBoundary,
  PolicyBoundary,
} = require('../../../../src/enterprise/policy');

function buildSecurityPolicyFlow() {
  const runtimeGuard = new RuntimeGuard('rc2.runtime.guard');
  const requestGuard = new RequestGuard('rc2.request.guard');
  const validation = new ValidationBoundary('rc2.validation');
  const policy = new PolicyBoundary('rc2.policy');

  runtimeGuard.addRule(
    'runtime.enabled',
    (context) => context.runtime?.enabled === true,
    'runtime is disabled'
  );

  requestGuard.addRule(
    'method.allowed',
    (req) => req.method !== 'TRACE',
    'TRACE method denied'
  );

  validation.addRule(
    'body.name.required',
    (input) => Boolean(input.body?.name),
    'body.name is required'
  );

  policy.addRule(
    'permission.customer.create',
    (context) => {
      return context.enterpriseContext?.rbac?.permissions?.includes('customer:create');
    },
    'missing customer:create permission'
  );

  return {
    headers: createSecurityHeaders(),
    runtimeGuard,
    requestGuard,
    validation,
    policy,
  };
}

module.exports = {
  buildSecurityPolicyFlow,
};
