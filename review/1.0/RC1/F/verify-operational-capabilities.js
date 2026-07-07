const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const core = require(path.join(ROOT, 'packages/core/src'));

const CAPABILITIES = [
  {
    name: 'Authentication',
    layer: 'auth',
    anyOf: ['AuthenticationProviderRegistry', 'createAuthenticationProviderRegistry'],
  },
  {
    name: 'RBAC',
    layer: 'rbac',
    anyOf: ['RBACService', 'PermissionEngine', 'createRBACService'],
  },
  {
    name: 'Audit Trail',
    layer: 'audit',
    allOf: ['recordActivity', 'MemoryAuditProvider'],
  },
  {
    name: 'Outbox',
    layer: 'transactions',
    allOf: ['createOutboxEvent', 'addOutboxEvent', 'OutboxEventStatus'],
  },
  {
    name: 'Retry',
    layer: 'resilience',
    allOf: ['RetryPolicy', 'RetryBoundary'],
  },
  {
    name: 'Idempotency',
    layer: 'resilience',
    allOf: ['IdempotencyBoundary', 'MemoryIdempotencyStore'],
  },
  {
    name: 'Metrics',
    layer: 'observability',
    allOf: ['MetricsRegistry', 'MetricType'],
  },
  {
    name: 'Health Signals',
    layer: 'observability',
    allOf: ['HealthSignalRegistry', 'HealthStatus'],
  },
  {
    name: 'Logging',
    layer: 'logging',
    allOf: ['EnterpriseLogger', 'createLogEntry'],
  },
  {
    name: 'Security Headers',
    layer: 'security',
    allOf: ['createSecurityHeaders', 'applySecurityHeaders'],
  },
];

const missing = [];

for (const capability of CAPABILITIES) {
  const layer = core[capability.layer];

  if (!layer) {
    missing.push(`${capability.name}: missing layer ${capability.layer}`);
    continue;
  }

  if (capability.allOf) {
    for (const symbol of capability.allOf) {
      if (!layer[symbol]) {
        missing.push(`${capability.name}: missing symbol ${symbol}`);
      }
    }
  }

  if (capability.anyOf) {
    const found = capability.anyOf.some((symbol) => Boolean(layer[symbol]));

    if (!found) {
      missing.push(`${capability.name}: missing one of ${capability.anyOf.join(', ')}`);
    }
  }
}

assert(
  missing.length === 0,
  `Missing operational capabilities: ${missing.join('; ')}`
);

console.log('Operational capabilities checked :', CAPABILITIES.length);
console.log('Missing capabilities             :', missing.length);
console.log('✅ RC1-F Part 2 — Operational capabilities verified');
