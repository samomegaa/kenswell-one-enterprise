const { LogLevel, LogLevelPriority } = require('./log-levels');
const { createLogEntry } = require('./log-entry');
const { defaultLoggerProvider } = require('./logger-provider');

class EnterpriseLogger {
  constructor({
    provider = defaultLoggerProvider,
    level = LogLevel.DEBUG,
  } = {}) {
    this.provider = provider;
    this.level = level;
  }

  shouldLog(level) {
    return LogLevelPriority[level] >= LogLevelPriority[this.level];
  }

  log(level, message, context = {}) {
    if (!this.shouldLog(level)) {
      return null;
    }

    const entry = createLogEntry({
      level,
      message,
      ...context,
    });

    return this.provider.write(entry);
  }

  debug(message, context = {}) {
    return this.log(LogLevel.DEBUG, message, context);
  }

  info(message, context = {}) {
    return this.log(LogLevel.INFO, message, context);
  }

  warn(message, context = {}) {
    return this.log(LogLevel.WARN, message, context);
  }

  error(message, context = {}) {
    return this.log(LogLevel.ERROR, message, context);
  }

  fatal(message, context = {}) {
    return this.log(LogLevel.FATAL, message, context);
  }

  query(predicate) {
    return this.provider.query(predicate);
  }

  clear() {
    return this.provider.clear();
  }
}

const defaultEnterpriseLogger = new EnterpriseLogger();

module.exports = {
  EnterpriseLogger,
  defaultEnterpriseLogger,
};
