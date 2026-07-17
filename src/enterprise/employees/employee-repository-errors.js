class EmployeeRepositoryError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EmployeeRepositoryError';
    this.details = details;
  }
}

class EmployeeNotFoundError
  extends EmployeeRepositoryError {
  constructor(employeeId) {
    super(
      `Employee not found: ${employeeId}`,
      { employeeId }
    );
    this.name = 'EmployeeNotFoundError';
  }
}

class EmployeeConflictError
  extends EmployeeRepositoryError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'EmployeeConflictError';
  }
}

module.exports = {
  EmployeeRepositoryError,
  EmployeeNotFoundError,
  EmployeeConflictError,
};
