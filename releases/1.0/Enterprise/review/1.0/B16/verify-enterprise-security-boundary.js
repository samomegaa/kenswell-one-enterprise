const {
  DEFAULT_SECURITY_HEADERS,
  createSecurityHeaders,
  applySecurityHeaders,
  RuntimeGuard,
  RequestGuard,
  allowSecurity,
  denySecurity,
  enterpriseSecurityMiddleware,
  RuntimeGuardError,
  RequestGuardError,
} = require('../../../src/enterprise/security');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const headers = createSecurityHeaders({
    'x-test-security': 'enabled',
  });

  assert(headers['x-content-type-options'] === 'nosniff', 'default security header missing');
  assert(headers['x-test-security'] === 'enabled', 'custom security header missing');
  assert(DEFAULT_SECURITY_HEADERS['x-frame-options'] === 'DENY', 'frame header mismatch');

  const mockResponse = {
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
  };

  applySecurityHeaders(mockResponse, headers);

  assert(mockResponse.headers['x-content-type-options'] === 'nosniff', 'headers not applied');
  assert(mockResponse.headers['x-test-security'] === 'enabled', 'custom header not applied');

  const runtimeGuard = new RuntimeGuard('verification.runtime');

  runtimeGuard.addRule(
    'environment.allowed',
    (context) => context.runtime?.environment !== 'forbidden',
    'environment forbidden'
  );

  const runtimeAllowed = await runtimeGuard.evaluate({
    runtime: {
      environment: 'test',
    },
  });

  assert(runtimeAllowed.allowed === true, 'runtime guard should allow test environment');

  const runtimeDenied = await runtimeGuard.evaluate({
    runtime: {
      environment: 'forbidden',
    },
  });

  assert(runtimeDenied.allowed === false, 'runtime guard should deny forbidden environment');

  const requestGuard = new RequestGuard('verification.request');

  requestGuard.addRule(
    'method.allowed',
    (req) => req.method !== 'TRACE',
    'TRACE method denied'
  );

  const requestAllowed = await requestGuard.evaluate({
    method: 'GET',
  });

  assert(requestAllowed.allowed === true, 'request guard should allow GET');

  const requestDenied = await requestGuard.evaluate({
    method: 'TRACE',
  });

  assert(requestDenied.allowed === false, 'request guard should deny TRACE');

  const allow = allowSecurity('manual allow');
  const deny = denySecurity('manual deny');

  assert(allow.allowed === true, 'allowSecurity invalid');
  assert(deny.allowed === false, 'denySecurity invalid');

  assert(typeof enterpriseSecurityMiddleware === 'function', 'security middleware not exported');
  assert(typeof RuntimeGuardError === 'function', 'RuntimeGuardError not exported');
  assert(typeof RequestGuardError === 'function', 'RequestGuardError not exported');
  assert(core.security, 'security not exported from core');
  assert(typeof core.security.RuntimeGuard === 'function', 'core RuntimeGuard export invalid');
  assert(typeof core.security.RequestGuard === 'function', 'core RequestGuard export invalid');

  console.log('✅ Enterprise Security Headers and Runtime Guard Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
