'use strict';

const {
  createLiveStaffologyValidation,
} = require(
  '../../../../src/enterprise/payroll/validation'
);

const {
  requireEnvironment,
} = require('./environment');

const {
  createLiveProvider,
} = require('./create-live-provider');

const {
  createLiveEmployeeService,
} = require(
  './create-live-employee-service'
);

const {
  createLiveWorkspaceService,
} = require(
  './create-live-workspace-service'
);

function createLiveValidationComposition({
  environment = process.env,
} = {}) {
  const configuration =
    requireEnvironment(environment);

  const {
    client,
    provider,
  } = createLiveProvider(configuration);

  const employeeService =
    createLiveEmployeeService({
      client,
      employerId:
        configuration.employerId,
    });

  const {
    service: employeeWorkspaceService,
    getWorkspace,
  } = createLiveWorkspaceService({
    employeeService,
  });

  const workspaceAdapter =
    Object.freeze({ getWorkspace });

  const validationRunner =
    createLiveStaffologyValidation({
      providerClient: provider,
      employeeWorkspaceService:
        workspaceAdapter,
    });

  return Object.freeze({
    configuration,
    client,
    provider,
    employeeService,
    employeeWorkspaceService,
    workspaceAdapter,
    validationRunner,
  });
}

const composition =
    createLiveValidationComposition();

module.exports = {
    ...composition,
    createLiveValidationComposition,
};
