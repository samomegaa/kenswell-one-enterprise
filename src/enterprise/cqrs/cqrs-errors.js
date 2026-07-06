class EnterpriseCqrsError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseCqrsError';
    this.details = details;
    this.statusCode = 500;
  }
}

class CommandExecutionError extends EnterpriseCqrsError {
  constructor(commandName, cause) {
    super(`Command execution failed: ${commandName}`, {
      commandName,
      cause: cause?.message || String(cause),
    });

    this.name = 'CommandExecutionError';
  }
}

class QueryExecutionError extends EnterpriseCqrsError {
  constructor(queryName, cause) {
    super(`Query execution failed: ${queryName}`, {
      queryName,
      cause: cause?.message || String(cause),
    });

    this.name = 'QueryExecutionError';
  }
}

class CommandNotFoundError extends EnterpriseCqrsError {
  constructor(commandName) {
    super(`Command not found: ${commandName}`, { commandName });
    this.name = 'CommandNotFoundError';
    this.statusCode = 404;
  }
}

class QueryNotFoundError extends EnterpriseCqrsError {
  constructor(queryName) {
    super(`Query not found: ${queryName}`, { queryName });
    this.name = 'QueryNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  EnterpriseCqrsError,
  CommandExecutionError,
  QueryExecutionError,
  CommandNotFoundError,
  QueryNotFoundError,
};
