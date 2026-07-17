const {
  PersistenceError,
} = require('../persistence');

class EmployeePersistenceError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EmployeePersistenceError';
    this.details = details;
  }
}

class EmployeePersistenceMappingError
  extends EmployeePersistenceError {
  constructor(message, details = {}) {
    super(message, details);
    this.name =
      'EmployeePersistenceMappingError';
  }
}

class EmployeePersistenceConflictError
  extends EmployeePersistenceError {
  constructor(message, details = {}) {
    super(message, details);
    this.name =
      'EmployeePersistenceConflictError';
  }
}

class EmployeePersistenceVersionError
  extends EmployeePersistenceError {
  constructor(message, details = {}) {
    super(message, details);
    this.name =
      'EmployeePersistenceVersionError';
  }
}

function translatePersistenceError(error) {
  if (error instanceof EmployeePersistenceError) {
    return error;
  }

  if (error instanceof PersistenceError) {
    return new EmployeePersistenceError(
      error.message,
      {
        cause: error,
        ...error.details,
      }
    );
  }

  return new EmployeePersistenceError(
    error.message ||
      'Employee persistence failed',
    { cause: error }
  );
}

module.exports = {
  EmployeePersistenceError,
  EmployeePersistenceMappingError,
  EmployeePersistenceConflictError,
  EmployeePersistenceVersionError,
  translatePersistenceError,
};
