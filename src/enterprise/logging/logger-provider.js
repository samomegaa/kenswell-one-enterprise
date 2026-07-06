const { LoggerProviderError } = require('./logging-errors');

class LoggerProvider {
  write() {
    throw new LoggerProviderError('LoggerProvider.write must be implemented');
  }

  query() {
    throw new LoggerProviderError('LoggerProvider.query must be implemented');
  }

  clear() {
    throw new LoggerProviderError('LoggerProvider.clear must be implemented');
  }
}

class MemoryLoggerProvider extends LoggerProvider {
  constructor() {
    super();
    this.entries = [];
  }

  write(entry) {
    this.entries.push(entry);
    return entry;
  }

  query(predicate = () => true) {
    return this.entries.filter(predicate);
  }

  clear() {
    this.entries.length = 0;
  }
}

const defaultLoggerProvider = new MemoryLoggerProvider();

module.exports = {
  LoggerProvider,
  MemoryLoggerProvider,
  defaultLoggerProvider,
};
