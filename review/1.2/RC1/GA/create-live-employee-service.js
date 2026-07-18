'use strict';

const {
  fromStaffologyEmployee,
} = require(
  '../../../../src/enterprise/employees/providers/staffology/staffology-employee-mapper'
);

function createLiveEmployeeService({
  client,
  employerId,
} = {}) {
  if (!client?.get) {
    throw new TypeError(
      'Staffology client.get is required'
    );
  }

  if (!employerId) {
    throw new TypeError(
      'Staffology employer ID is required'
    );
  }

  async function get(employeeId) {
    if (!employeeId) {
      throw new TypeError(
        'Staffology employee ID is required'
      );
    }

    const source = await client.get(
      `/employers/${encodeURIComponent(employerId)}` +
      `/employees/${encodeURIComponent(employeeId)}`
    );

    const employee =
      fromStaffologyEmployee(source);

    return Object.freeze({
      id: source.id || employeeId,
      employerId,
      version: source.version ?? null,
      ...employee,
      provider: Object.freeze({
        provider: 'staffology',
        externalEmployeeId:
          source.id || employeeId,
        externalEmployerId: employerId,
        contractVersion:
          source.version
            ? String(source.version)
            : '1.0',
        connection: 'available',
        authentication: 'authenticated',
        synchronisationState: 'live-read-only',
        lastSuccessfulSync:
          new Date().toISOString(),
      }),
    });
  }

  return Object.freeze({ get });
}

module.exports = {
  createLiveEmployeeService,
};
