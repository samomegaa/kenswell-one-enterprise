const {
  LogLevel,
  LogLevelPriority,
} = require('./log-levels');

const {
  createCorrelationId,
  extractCorrelationContext,
} = require('./correlation');

const { createLogEntry } = require('./log-entry');

const {
  LoggerProvider,
  MemoryLoggerProvider,
  defaultLoggerProvider,
} = require('./logger-provider');

const {
  EnterpriseLogger,
  defaultEnterpriseLogger,
} = require('./logger');

const { enterpriseLoggingMiddleware } = require('./logging-middleware');

const {
  EnterpriseLoggingError,
  LoggerProviderError,
  LogEntryError,
} = require('./logging-errors');

module.exports = {
  LogLevel,
  LogLevelPriority,

  createCorrelationId,
  extractCorrelationContext,

  createLogEntry,

  LoggerProvider,
  MemoryLoggerProvider,
  defaultLoggerProvider,

  EnterpriseLogger,
  defaultEnterpriseLogger,

  enterpriseLoggingMiddleware,

  EnterpriseLoggingError,
  LoggerProviderError,
  LogEntryError,
};
