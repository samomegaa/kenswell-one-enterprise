'use strict';

const {
  createEmployeeWorkspaceService,
} = require(
  '../../../../src/enterprise/employees/workspace'
);

function createLiveWorkspaceService({
  employeeService,
} = {}) {
  const service =
    createEmployeeWorkspaceService({
      employeeService,
    });

  return Object.freeze({
    service,

    async getWorkspace({
      employeeId,
    } = {}) {
      return service.get(employeeId);
    },
  });
}

module.exports = {
  createLiveWorkspaceService,
};
