const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const core = require(path.join(ROOT, 'packages/core/src'));

const HARDENING_CHECKS = [
  {
    name: 'Enterprise errors',
    layer: 'security',
    symbols: ['EnterpriseSecurityError', 'RuntimeGuardError', 'RequestGuardError'],
  },
  {
    name: 'Security headers',
    layer: 'security',
    symbols: ['DEFAULT_SECURITY_HEADERS', 'createSecurityHeaders', 'applySecurityHeaders'],
  },
  {
    name: 'Observability',
    layer: 'observability',
    symbols: ['MetricsRegistry', 'Tracer', 'HealthSignalRegistry'],
  },
  {
    name: 'Logging',
    layer: 'logging',
    symbols: ['EnterpriseLogger', 'createLogEntry', 'extractCorrelationContext'],
  },
  {
    name: 'Resilience',
    layer: 'resilience',
    symbols: ['IdempotencyBoundary', 'RetryBoundary'],
  },
  {
    name: 'Transactions',
    layer: 'transactions',
    symbols: ['TransactionBoundary', 'TransactionManager'],
  },
];

const missing = [];

for (const check of HARDENING_CHECKS) {
  const layer = core[check.layer];

  if (!layer) {
    missing.push(`${check.name}: missing layer ${check.layer}`);
    continue;
  }

  for (const symbol of check.symbols) {
    if (!layer[symbol]) {
      missing.push(`${check.name}: missing symbol ${symbol}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing hardening capabilities: ${missing.join('; ')}`
);

const apiSuccess = core.api.apiSuccess({ ok: true });
const domainSuccess = core.domain.domainSuccess({ ok: true });
const applicationSuccess = core.application.applicationSuccess({ ok: true });
const cqrsSuccess = core.cqrs.cqrsSuccess({ ok: true });

assert(Object.isFrozen(apiSuccess), 'apiSuccess result is not immutable');
assert(Object.isFrozen(domainSuccess), 'domainSuccess result is not immutable');
assert(Object.isFrozen(applicationSuccess), 'applicationSuccess result is not immutable');
assert(Object.isFrozen(cqrsSuccess), 'cqrsSuccess result is not immutable');

const headers = core.security.createSecurityHeaders();

assert(headers['x-content-type-options'] === 'nosniff', 'security headers missing x-content-type-options');
assert(headers['x-frame-options'] === 'DENY', 'security headers missing x-frame-options');

console.log('Hardening capabilities checked :', HARDENING_CHECKS.length);
console.log('Missing hardening capabilities :', missing.length);
console.log('Immutable result helpers       : 4');
console.log('Security headers verified      : 2');

console.log('✅ RC1-F Part 3 — Enterprise hardening verified');
