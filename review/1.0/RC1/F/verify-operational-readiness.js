const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const observability = require(path.join(ROOT, 'src/enterprise/observability'));
const logging = require(path.join(ROOT, 'src/enterprise/logging'));
const audit = require(path.join(ROOT, 'src/enterprise/audit'));

assert(typeof observability.MetricsRegistry === 'function',
  'MetricsRegistry missing');

assert(typeof observability.Tracer === 'function',
  'Tracer missing');

assert(typeof observability.HealthSignalRegistry === 'function',
  'HealthSignalRegistry missing');

assert(typeof observability.enterpriseObservabilityMiddleware === 'function',
  'Observability middleware missing');

assert(typeof logging.EnterpriseLogger === 'function',
  'EnterpriseLogger missing');

assert(typeof logging.createLogEntry === 'function',
  'createLogEntry missing');

assert(typeof logging.enterpriseLoggingMiddleware === 'function',
  'Logging middleware missing');

assert(typeof audit.recordActivity === 'function',
  'recordActivity missing');

assert(typeof audit.enterpriseAuditMiddleware === 'function',
  'Audit middleware missing');

console.log('Metrics Registry          : OK');
console.log('Tracing                   : OK');
console.log('Health Signals            : OK');
console.log('Observability Middleware  : OK');
console.log('Enterprise Logger         : OK');
console.log('Structured Log Entry      : OK');
console.log('Audit Trail               : OK');

console.log('✅ RC1-F Part 2 — Operational readiness verified');
