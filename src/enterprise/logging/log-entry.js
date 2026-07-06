const crypto = require('crypto');
const { LogLevel } = require('./log-levels');
const { LogEntryError } = require('./logging-errors');
const { extractCorrelationContext } = require('./correlation');

function createLogId() {
  return `log_${crypto.randomUUID()}`;
}

function createLogEntry({
  level = LogLevel.INFO,
  message,
  enterpriseContext = null,
  workflowContext = null,
  transactionBoundary = null,
  span = null,
  metadata = {},
  error = null,
} = {}) {
  if (!Object.values(LogLevel).includes(level)) {
    throw new LogEntryError('invalid log level', { level });
  }

  if (!message || typeof message !== 'string') {
    throw new LogEntryError('log message is required');
  }

  const correlation = extractCorrelationContext({
    enterpriseContext,
    workflowContext,
    transactionBoundary,
    span,
    metadata,
  });

  return Object.freeze({
    logId: createLogId(),
    timestamp: new Date().toISOString(),
    level,
    message,
    correlation,
    metadata,
    error: error
      ? {
          name: error.name || 'Error',
          message: error.message || String(error),
          stack: error.stack || null,
        }
      : null,
  });
}

module.exports = {
  createLogEntry,
};
