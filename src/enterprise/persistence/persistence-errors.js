class PersistenceError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'PersistenceError';
    this.details = details;
  }
}

class PersistenceUnavailableError extends PersistenceError {
  constructor(message = 'Persistence is unavailable', details = {}) {
    super(message, details);
    this.name = 'PersistenceUnavailableError';
  }
}

class PersistenceConflictError extends PersistenceError {
  constructor(message = 'Persistence conflict', details = {}) {
    super(message, details);
    this.name = 'PersistenceConflictError';
  }
}

class PersistenceNotFoundError extends PersistenceError {
  constructor(id, details = {}) {
    super(`Persistent entity not found: ${id}`, { id, ...details });
    this.name = 'PersistenceNotFoundError';
  }
}

class PersistenceValidationError extends PersistenceError {
  constructor(message = 'Persistence validation failed', details = {}) {
    super(message, details);
    this.name = 'PersistenceValidationError';
  }
}

class PersistenceVersionError extends PersistenceError {
  constructor(message = 'Persistence version mismatch', details = {}) {
    super(message, details);
    this.name = 'PersistenceVersionError';
  }
}

class PersistenceTransactionError extends PersistenceError {
  constructor(message = 'Persistence transaction failed', details = {}) {
    super(message, details);
    this.name = 'PersistenceTransactionError';
  }
}

module.exports = {
  PersistenceError,
  PersistenceUnavailableError,
  PersistenceConflictError,
  PersistenceNotFoundError,
  PersistenceValidationError,
  PersistenceVersionError,
  PersistenceTransactionError,
};
