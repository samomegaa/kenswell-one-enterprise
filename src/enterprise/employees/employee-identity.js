const { EmployeeValidationError } = require('./employee-errors');

function createEmployeeIdentity(input = {}) {
  const displayName = input.displayName || [input.title, input.firstName, input.lastName].filter(Boolean).join(' ');
  if (!displayName) throw new EmployeeValidationError('Employee display name is required');
  return Object.freeze({
    title: input.title || null,
    firstName: input.firstName || null,
    middleName: input.middleName || null,
    lastName: input.lastName || null,
    displayName,
    dateOfBirth: input.dateOfBirth || null,
    email: input.email || null,
    telephone: input.telephone || null,
    address: Object.freeze({ ...(input.address || {}) }),
  });
}
module.exports = { createEmployeeIdentity };
