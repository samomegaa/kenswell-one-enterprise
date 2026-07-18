'use strict';
const { StaffologyEmployerDirectory, EmployerCache, EmployerDiscoveryService } = require('../../../../src/enterprise/employers');
const { EmployerScopedEmployeeService } = require('../services/employer-scoped-employee-service');
const { EmployerWorkspaceService } = require('../services/employer-workspace-service');
function createEmployerRuntimeComposition({ client, mapEmployee, createWorkspaceService, cacheTtlMilliseconds = 300000 } = {}) {
  const directory = new StaffologyEmployerDirectory({ client });
  const cache = new EmployerCache({ ttlMilliseconds: cacheTtlMilliseconds });
  const employerService = new EmployerDiscoveryService({ directory, cache });
  const employeeService = new EmployerScopedEmployeeService({ client, mapEmployee });
  const workspaceService = new EmployerWorkspaceService({ employeeService, createWorkspaceService });
  return Object.freeze({ employerService, employeeService, workspaceService });
}
module.exports = { createEmployerRuntimeComposition };
