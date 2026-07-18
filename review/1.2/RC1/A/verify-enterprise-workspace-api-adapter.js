#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const {
  createEmployeeWorkspaceService,
  createEmployeeWorkspaceController,
  createEmployeeWorkspaceRoutes,
} = require(
  '../../../../src/enterprise/employees/workspace'
);

console.log(
  'RC1-A Enterprise Workspace API & Adapter'
);
console.log();

const employee = Object.freeze({
  id: 'employee-1',
  clientId: 'client-1',
  employerId: 'employer-1',
  version: 3,
  personalDetails: {
    firstName: 'Amina',
    lastName: 'Khan',
    dateOfBirth: '1990-04-12',
    address: {
      line1: '1 High Street',
      postCode: 'SW1A 1AA',
    },
  },
  employmentDetails: {
    payrollCode: 'EMP001',
    starterDetails: {
      startDate: '2026-04-06',
    },
    isDirector: false,
  },
  taxAndNi: {
    taxCode: '1257L',
    niTable: 'A',
  },
  payOptions: {
    payScheduleId: 'monthly',
  },
  provider: {
    provider: 'staffology',
    externalEmployeeId: 'staffology-employee-1',
    externalEmployerId: 'staffology-employer-1',
    contractFingerprint: 'fingerprint-1',
    contractVersion: '1.0',
    synchronisationState: 'in-sync',
  },
});

const employeeService = {
  async get(employeeId) {
    assert.strictEqual(employeeId, 'employee-1');
    return employee;
  },
};

(async () => {
  const service =
    createEmployeeWorkspaceService({
      employeeService,
    });

  const result =
    await service.get('employee-1');

  assert.strictEqual(
    result.employee.id,
    'employee-1'
  );

  assert(
    Array.isArray(
      result.workspaceSchema.sections
    )
  );

  assert(
    Array.isArray(
      result.visibleWorkspace.sections
    )
  );

  console.log(
    'PASS  Enterprise workspace assembled'
  );

  assert(result.readiness.levels.creation);
  assert(result.readiness.levels.payroll);
  assert(result.readiness.levels.rti);

  console.log(
    'PASS  Readiness dashboard included'
  );

  assert.strictEqual(
    result.providerPanel.summary.provider,
    'staffology'
  );

  assert.strictEqual(
    result.contract.fingerprint,
    'fingerprint-1'
  );

  console.log(
    'PASS  Provider contract included'
  );

  const controller =
    createEmployeeWorkspaceController({
      service,
    });

  assert.strictEqual(
    typeof controller.get,
    'function'
  );

  console.log(
    'PASS  Workspace controller created'
  );

  const routes = [];
  const express = {
    Router() {
      return {
        use() {},
        get(route, handler) {
          routes.push({
            method: 'GET',
            route,
            handler,
          });
        },
      };
    },
  };

  createEmployeeWorkspaceRoutes({
    express,
    controller,
  });

  assert.strictEqual(
    routes[0].route,
    '/employees/:employeeId/workspace'
  );

  console.log(
    'PASS  Workspace route registered'
  );

  const frontendRoot = path.resolve(
    __dirname,
    '../../../../products/tax-payroll/frontend/src/workspaces/employees'
  );

  [
    'employeeWorkspaceAdapter.js',
    'useEnterpriseEmployeeWorkspace.js',
  ].forEach((file) => {
    assert(
      fs.existsSync(path.join(frontendRoot, file)),
      `${file} is missing`
    );
  });

  const apiSource = fs.readFileSync(
    path.join(frontendRoot, 'employeeApi.js'),
    'utf8'
  );

  assert(
    apiSource.includes('getEmployeeWorkspace')
  );

  console.log(
    'PASS  Frontend workspace adapter boundary'
  );

  assert(Object.isFrozen(result));
  assert(Object.isFrozen(result.contract));
  assert(Object.isFrozen(result.metadata));

  console.log(
    'PASS  Immutable integration contract'
  );

  console.log();
  console.log(
    '✅ RC1-A Enterprise Workspace API & Adapter passed'
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
