const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const EXPECTED_SYMBOLS = {
  api: [
    'ApiServiceBoundary',
    'ApiController',
    'createApiRequest',
    'apiSuccess',
    'apiFailure',
    'enterpriseApiBoundaryMiddleware',
  ],

  application: [
    'ApplicationService',
    'ApplicationUseCase',
    'ApplicationServiceRegistry',
    'applicationSuccess',
    'applicationFailure',
  ],

  audit: [
    'createAuditContext',
    'recordActivity',
    'AuditProvider',
    'MemoryAuditProvider',
    'enterpriseAuditMiddleware',
    'AuditEvents',
  ],

  context: [
    'createEnterpriseContext',
    'requireEnterpriseContext',
    'resolveEnterpriseContext',
    'enterpriseContextMiddleware',
  ],

  cqrs: [
    'Command',
    'CommandBus',
    'Query',
    'QueryBus',
    'cqrsSuccess',
    'cqrsFailure',
    'enterpriseCqrsMiddleware',
  ],

  domain: [
    'DomainService',
    'DomainOperation',
    'DomainServiceRegistry',
    'domainSuccess',
    'domainFailure',
  ],

  logging: [
    'LogLevel',
    'createLogEntry',
    'EnterpriseLogger',
    'MemoryLoggerProvider',
    'extractCorrelationContext',
    'enterpriseLoggingMiddleware',
  ],

  observability: [
    'MetricsRegistry',
    'MetricType',
    'Tracer',
    'HealthSignalRegistry',
    'HealthStatus',
    'enterpriseObservabilityMiddleware',
  ],

  policy: [
    'ValidationBoundary',
    'ValidationRule',
    'PolicyBoundary',
    'PolicyRule',
    'allowPolicy',
    'denyPolicy',
    'enterpriseValidationPolicyMiddleware',
  ],

  resilience: [
    'MemoryIdempotencyStore',
    'IdempotencyBoundary',
    'RetryPolicy',
    'RetryBoundary',
    'createRequestHash',
    'enterpriseResilienceMiddleware',
  ],

  security: [
    'DEFAULT_SECURITY_HEADERS',
    'createSecurityHeaders',
    'applySecurityHeaders',
    'RuntimeGuard',
    'RequestGuard',
    'enterpriseSecurityMiddleware',
  ],

  transactions: [
    'TransactionBoundary',
    'TransactionManager',
    'createOutboxEvent',
    'addOutboxEvent',
    'OutboxEventStatus',
    'OutboxEventType',
    'enterpriseTransactionMiddleware',
  ],

  workflow: [
    'EnterpriseWorkflow',
    'WorkflowStep',
    'UnitOfWork',
    'createWorkflowContext',
    'enterpriseWorkflowMiddleware',
  ],
};

const results = [];

for (const [layer, symbols] of Object.entries(EXPECTED_SYMBOLS)) {
  const exported = require(path.join(ROOT, 'src/enterprise', layer));
  const names = Object.keys(exported);

  const missing = symbols.filter((symbol) => {
    return !names.includes(symbol);
  });

  assert(
    missing.length === 0,
    `Layer ${layer} missing expected public symbols: ${missing.join(', ')}`
  );

  results.push({
    layer,
    expected: symbols.length,
    missing: missing.length,
  });
}

console.log('Enterprise layers checked :', results.length);

for (const result of results) {
  console.log(
    `${result.layer.padEnd(16)} expected-symbols=${result.expected} missing=${result.missing}`
  );
}

console.log('✅ RC1-C Part 3 — Expected public symbols verified');
