#!/usr/bin/env node
'use strict';

const assert = require('assert');

const {
  requireEnvironment,
} = require('./environment');

const {
  createLiveProvider,
} = require('./create-live-provider');

const {
  createLiveEmployeeService,
} = require('./create-live-employee-service');

const {
  createLiveWorkspaceService,
} = require('./create-live-workspace-service');

const {
  resolveWorkspaceGetter,
} = require(
  '../../../../src/enterprise/payroll/validation/workspace-validation-service'
);

console.log(
  'RC1-GA Enterprise Live Validation Composition'
);
console.log();

(async () => {
  const configuration =
    requireEnvironment({
      STAFFOLOGY_API_KEY: 'test-key',
      STAFFOLOGY_EMPLOYER_ID:
        'test-employer',
      STAFFOLOGY_VALIDATION_EMPLOYEE_ID:
        'test-employee',
    });

  console.log(
    'PASS  Environment validated'
  );

  const fakeFetch = async () => ({
    ok: true,
    status: 200,
    async text() {
      return JSON.stringify({
        id: 'test-employee',
        personalDetails: {
          firstName: 'Test',
          lastName: 'Employee',
        },
      });
    },
  });

  const live = createLiveProvider({
    ...configuration,
    baseUrl: 'https://example.invalid',
  });

  live.client.fetch = fakeFetch;

  assert.strictEqual(
    live.provider.name,
    'staffology'
  );

  console.log(
    'PASS  Staffology provider created'
  );

  const employeeService =
    createLiveEmployeeService({
      client: live.client,
      employerId:
        configuration.employerId,
    });

  const employee =
    await employeeService.get(
      configuration.employeeId
    );

  assert.strictEqual(
    employee.provider.provider,
    'staffology'
  );

  console.log(
    'PASS  Live employee service created'
  );

  const workspace =
    createLiveWorkspaceService({
      employeeService,
    });

  assert.strictEqual(
    typeof workspace.service.get,
    'function'
  );

  console.log(
    'PASS  Employee workspace service created'
  );

  const getter = resolveWorkspaceGetter(
    workspace.service
  );

  const result = await getter({
    employeeId:
      configuration.employeeId,
    context: {},
  });

  assert(result.employee);

  console.log(
    'PASS  Workspace get() adapter operational'
  );

  console.log();
  console.log(
    '✅ RC1-GA Enterprise Live Validation Composition passed'
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
