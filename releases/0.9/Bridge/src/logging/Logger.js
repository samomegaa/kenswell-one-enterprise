const {
  LOG_LEVELS,
  LOG_LEVEL_PRIORITY,
} = require('./logging.constants');

class Logger {
  constructor({ level = LOG_LEVELS.INFO, service = 'kenswell-one', stream = console } = {}) {
    this.level = level;
    this.service = service;
    this.stream = stream;
  }

  shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level];
  }

  format(level, event, payload = {}) {
    return JSON.stringify({
      level,
      service: this.service,
      event,
      timestamp: new Date().toISOString(),
      ...payload,
    });
  }

  write(level, event, payload = {}) {
    if (!this.shouldLog(level)) {
      return null;
    }

    const line = this.format(level, event, payload);

    if (level === LOG_LEVELS.ERROR && typeof this.stream.error === 'function') {
      this.stream.error(line);
      return line;
    }

    if (level === LOG_LEVELS.WARN && typeof this.stream.warn === 'function') {
      this.stream.warn(line);
      return line;
    }

    this.stream.log(line);
    return line;
  }

  debug(event, payload = {}) {
    return this.write(LOG_LEVELS.DEBUG, event, payload);
  }

  info(event, payload = {}) {
    return this.write(LOG_LEVELS.INFO, event, payload);
  }

  warn(event, payload = {}) {
    return this.write(LOG_LEVELS.WARN, event, payload);
  }

  error(event, payload = {}) {
    return this.write(LOG_LEVELS.ERROR, event, payload);
  }

  log(message) {
    return this.info('log', { message });
  }
}

module.exports = Logger;
