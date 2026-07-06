const {
  LogLevel,
  createCorrelationId,
  extractCorrelationContext,
  createLogEntry,
  MemoryLoggerProvider,
  EnterpriseLogger,
  enterpriseLoggingMiddleware,
} = require('../../../src/enterprise/logging');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const correlationId = createCorrelationId();

  assert(correlationId.startsWith('corr_'), 'correlation id invalid');

  const enterpriseContext = {
    requestId: 'req_logging',
    correlationId: 'corr_logging',
    tenant: {
      id: 'tenant_logging',
      slug: 'logging',
    },
    identity: {
      userId: 'user_logging',
      email: 'logging@example.com',
    },
  };

  const workflowContext = {
    workflowId: 'wf_logging',
  };

  const transactionBoundary = {
    transactionId: 'tx_logging',
  };

  const span = {
    traceId: 'trace_logging',
    spanId: 'span_logging',
  };

  const correlation = extractCorrelationContext({
    enterpriseContext,
    workflowContext,
    transactionBoundary,
    span,
  });

  assert(correlation.requestId === 'req_logging', 'requestId correlation mismatch');
  assert(correlation.correlationId === 'corr_logging', 'correlationId mismatch');
  assert(correlation.tenantId === 'tenant_logging', 'tenantId mismatch');
  assert(correlation.actorId === 'user_logging', 'actorId mismatch');
  assert(correlation.workflowId === 'wf_logging', 'workflowId mismatch');
  assert(correlation.transactionId === 'tx_logging', 'transactionId mismatch');
  assert(correlation.traceId === 'trace_logging', 'traceId mismatch');

  const entry = createLogEntry({
    level: LogLevel.INFO,
    message: 'verification.log',
    enterpriseContext,
    workflowContext,
    transactionBoundary,
    span,
    metadata: {
      verified: true,
    },
  });

  assert(entry.logId.startsWith('log_'), 'logId invalid');
  assert(entry.level === LogLevel.INFO, 'log level mismatch');
  assert(entry.message === 'verification.log', 'log message mismatch');
  assert(entry.correlation.tenantId === 'tenant_logging', 'log correlation mismatch');
  assert(Object.isFrozen(entry), 'log entry should be immutable');

  const provider = new MemoryLoggerProvider();
  const logger = new EnterpriseLogger({
    provider,
    level: LogLevel.INFO,
  });

  const debugEntry = logger.debug('debug.hidden');

  assert(debugEntry === null, 'debug should be filtered at info level');

  const infoEntry = logger.info('info.visible', {
    enterpriseContext,
  });

  const warnEntry = logger.warn('warn.visible', {
    enterpriseContext,
  });

  const errorEntry = logger.error('error.visible', {
    enterpriseContext,
    error: new Error('expected error'),
  });

  assert(infoEntry.message === 'info.visible', 'info log mismatch');
  assert(warnEntry.level === LogLevel.WARN, 'warn log mismatch');
  assert(errorEntry.error.message === 'expected error', 'error log mismatch');

  const logs = logger.query();

  assert(logs.length === 3, 'log count mismatch');

  const errorLogs = logger.query((item) => item.level === LogLevel.ERROR);

  assert(errorLogs.length === 1, 'error log query mismatch');

  logger.clear();

  assert(logger.query().length === 0, 'logger clear failed');

  assert(typeof enterpriseLoggingMiddleware === 'function', 'logging middleware not exported');
  assert(core.logging, 'logging not exported from core');
  assert(typeof core.logging.EnterpriseLogger === 'function', 'core logger export invalid');
  assert(typeof core.logging.createLogEntry === 'function', 'core log entry export invalid');

  console.log('✅ Enterprise Logging and Correlation Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
