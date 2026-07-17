const {
  EmployeeApiValidationError,
} = require('./employee-api-errors');

const SECTIONS = Object.freeze([
  'identity',
  'employment',
  'payroll',
  'tax',
  'nationalInsurance',
  'pension',
  'bankAccount',
  'leave',
  'provider',
]);

function requireString(value, field) {
  if (
    typeof value !== 'string' ||
    !value.trim()
  ) {
    throw new EmployeeApiValidationError(
      `${field} is required`,
      { field }
    );
  }

  return value.trim();
}

function validateCreateEmployee(body = {}) {
  const input = {
    ...body,
    clientId: requireString(
      body.clientId,
      'clientId'
    ),
    employerId: requireString(
      body.employerId,
      'employerId'
    ),
  };

  if (
    !body.identity ||
    typeof body.identity !== 'object'
  ) {
    throw new EmployeeApiValidationError(
      'identity is required',
      { field: 'identity' }
    );
  }

  return input;
}

function validateUpdateEmployee(body = {}) {
  if (
    !Number.isInteger(body.version) ||
    body.version < 1
  ) {
    throw new EmployeeApiValidationError(
      'A positive employee version is required',
      { field: 'version' }
    );
  }

  const changes = {};

  for (const section of SECTIONS) {
    if (body[section] !== undefined) {
      if (
        body[section] === null ||
        typeof body[section] !== 'object' ||
        Array.isArray(body[section])
      ) {
        throw new EmployeeApiValidationError(
          `${section} must be an object`,
          { field: section }
        );
      }

      changes[section] = body[section];
    }
  }

  if (!Object.keys(changes).length) {
    throw new EmployeeApiValidationError(
      'At least one employee section is required'
    );
  }

  return {
    version: body.version,
    changes,
  };
}

module.exports = {
  validateCreateEmployee,
  validateUpdateEmployee,
};
