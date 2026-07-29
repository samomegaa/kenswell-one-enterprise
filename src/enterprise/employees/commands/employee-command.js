const crypto = require('crypto');

function createEmployeeCommand({
  type,
  employerId,
  employeeId,
  payload = {},
  metadata = {},
} = {}) {
  return Object.freeze({
    id: `employee_command_${crypto.randomUUID()}`,
    type,
    employerId,
    employeeId,
    payload: Object.freeze({ ...payload }),
    metadata: Object.freeze({ ...metadata }),
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
}

module.exports = { createEmployeeCommand };
