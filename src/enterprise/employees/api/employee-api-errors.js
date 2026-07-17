class EmployeeApiError extends Error {
  constructor(
    message,
    {
      status = 500,
      code = 'employee_api_error',
      details = {},
    } = {}
  ) {
    super(message);
    this.name = 'EmployeeApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

class EmployeeApiValidationError
  extends EmployeeApiError {
  constructor(message, details = {}) {
    super(message, {
      status: 400,
      code: 'employee_validation_error',
      details,
    });
    this.name =
      'EmployeeApiValidationError';
  }
}

class EmployeeApiNotFoundError
  extends EmployeeApiError {
  constructor(employeeId) {
    super('Employee not found', {
      status: 404,
      code: 'employee_not_found',
      details: { employeeId },
    });
    this.name =
      'EmployeeApiNotFoundError';
  }
}

class EmployeeApiConflictError
  extends EmployeeApiError {
  constructor(message, details = {}) {
    super(message, {
      status: 409,
      code: 'employee_conflict',
      details,
    });
    this.name =
      'EmployeeApiConflictError';
  }
}

module.exports = {
  EmployeeApiError,
  EmployeeApiValidationError,
  EmployeeApiNotFoundError,
  EmployeeApiConflictError,
};
