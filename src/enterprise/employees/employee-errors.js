class EmployeeDomainError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EmployeeDomainError';
    this.details = details;
  }
}

class EmployeeValidationError extends EmployeeDomainError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'EmployeeValidationError';
  }
}

module.exports = { EmployeeDomainError, EmployeeValidationError };
