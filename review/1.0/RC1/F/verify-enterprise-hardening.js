const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const core = require(path.join(ROOT, 'packages/core/src'));

const HARDENING_LAYERS = [
  'api',
  'application',
  'audit',
  'context',
  'cqrs',
  'domain',
  'logging',
  'observability',
  'policy',
  'resilience',
  'security',
  'transactions',
  'workflow',
];

for (const layerName of HARDENING_LAYERS) {
  const layer = core[layerName];

  assert(layer, `Missing hardening layer: ${layerName}`);

  const exports = Object.keys(layer);

  const hasError = exports.some((name) => name.endsWith('Error'));
  const hasMiddleware = exports.some((name) => {
    return /^enterprise[A-Z].*Middleware$/.test(name);
  });

  assert(hasError, `Layer missing Error export: ${layerName}`);
  assert(hasMiddleware, `Layer missing enterprise middleware export: ${layerName}`);
}

const apiSuccess = core.api.apiSuccess({ ok: true });
const apiFailure = core.api.apiFailure(new Error('expected'));

assert(Object.isFrozen(apiSuccess), 'apiSuccess result is not frozen');
assert(Object.isFrozen(apiFailure), 'apiFailure result is not frozen');

const policyAllow = core.policy.allowPolicy('allowed');
const policyDeny = core.policy.denyPolicy('denied');

assert(Object.isFrozen(policyAllow), 'policy allow result is not frozen');
assert(Object.isFrozen(policyDeny), 'policy deny result is not frozen');

const securityHeaders = core.security.createSecurityHeaders();

assert(Object.isFrozen(securityHeaders), 'security headers are not frozen');
assert(securityHeaders['x-content-type-options'] === 'nosniff', 'security headers missing nosniff');

assert(typeof core.logging.EnterpriseLogger === 'function', 'EnterpriseLogger missing');
assert(typeof core.observability.MetricsRegistry === 'function', 'MetricsRegistry missing');

console.log('Hardening layers checked :', HARDENING_LAYERS.length);
console.log('Immutable result checks  : 4');
console.log('Security baseline        : passed');
console.log('Logging baseline         : passed');
console.log('Observability baseline   : passed');

console.log('✅ RC1-F Part 3 — Enterprise hardening verified');
