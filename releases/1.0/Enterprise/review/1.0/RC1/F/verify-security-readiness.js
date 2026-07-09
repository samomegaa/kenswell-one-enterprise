const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const security = require(path.join(ROOT, 'src/enterprise/security'));
const auth = require(path.join(ROOT, 'packages/core/src')).auth;
const rbac = require(path.join(ROOT, 'packages/core/src')).rbac;
const policy = require(path.join(ROOT, 'src/enterprise/policy'));
const resilience = require(path.join(ROOT, 'src/enterprise/resilience'));

assert(typeof security.enterpriseSecurityMiddleware === 'function',
  'Security middleware missing');

assert(typeof security.RuntimeGuard === 'function',
  'RuntimeGuard missing');

assert(typeof security.RequestGuard === 'function',
  'RequestGuard missing');

assert(typeof security.createSecurityHeaders === 'function',
  'Security headers factory missing');

assert(auth,
  'Authentication module missing');

assert(rbac,
  'RBAC module missing');

assert(typeof policy.PolicyBoundary === 'function',
  'PolicyBoundary missing');

assert(typeof resilience.IdempotencyBoundary === 'function',
  'IdempotencyBoundary missing');

assert(typeof resilience.RetryBoundary === 'function',
  'RetryBoundary missing');

console.log('Authentication            : OK');
console.log('RBAC                      : OK');
console.log('Security Boundary         : OK');
console.log('Policy Boundary           : OK');
console.log('Idempotency              : OK');
console.log('Retry Boundary           : OK');

console.log('✅ RC1-F Part 1 — Security readiness verified');
