const {
  EMPLOYEE_COMMAND_TYPES,
} = require('./employee-command-types');

const IMMUTABLE_FIELDS = Object.freeze([
  'id',
  'employeeId',
  'employerId',
  'provider',
  'externalEmployeeId',
]);

function validateEmployeeCommand(command = {}) {
  const errors = [];

  if (!EMPLOYEE_COMMAND_TYPES.includes(command.type)) {
    errors.push('Unsupported employee command type');
  }
  if (!command.employerId) {
    errors.push('Employer identifier is required');
  }
  if (!command.employeeId) {
    errors.push('Employee identifier is required');
  }
  if (!command.payload || typeof command.payload !== 'object') {
    errors.push('Command payload must be an object');
  }

  for (const field of IMMUTABLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(
      command.payload || {},
      field
    )) {
      errors.push(`Immutable field cannot be changed: ${field}`);
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    errors: Object.freeze(errors),
  });
}

module.exports = {
  IMMUTABLE_FIELDS,
  validateEmployeeCommand,
};
