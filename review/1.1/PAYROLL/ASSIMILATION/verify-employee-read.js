#!/usr/bin/env node

require('dotenv').config({
  path: '.env.local',
  quiet: true,
});

const assert = require('assert');

const {
  PayrollProviderMode,
  createEnterprisePayrollPlatform,
  staffology,
} = require(
  '../../../../src/enterprise/payroll'
);

async function run() {
  const apiKey =
    String(
      process.env.STAFFOLOGY_API_KEY || ''
    ).trim();

  assert(
    apiKey,
    'STAFFOLOGY_API_KEY is required'
  );

  const provider =
    staffology.createStaffologyPayrollProvider({
      apiKey,

      baseUrl:
        process.env.STAFFOLOGY_BASE_URL ||
        'https://api.staffology.co.uk',

      username:
        process.env.STAFFOLOGY_API_USERNAME ||
        'api',

      mode: PayrollProviderMode.TEST,
    });

  const platform =
    createEnterprisePayrollPlatform({
      providers: [provider],
      defaultProvider: 'staffology',
    });

  const health =
    await platform.manager.checkHealth(
      'staffology'
    );

  assert.strictEqual(
    health.available,
    true,
    'Staffology provider is not available'
  );

  const employerListing =
    await platform.manager.listEmployers(
      {},
      {
        provider: 'staffology',
        metadata: {
          verification:
            'employee-read-employer-selection',
        },
      }
    );

  const employer =
    employerListing.result.employers.find(
      (item) => item.employeeCount > 0
    );

  assert(
    employer,
    'no Staffology employer with employees was found'
  );

  const employeeListing =
    await platform.manager.listEmployees(
      {
        employerRef:
          employer.externalEmployerId,
      },
      {
        provider: 'staffology',
        metadata: {
          verification:
            'employee-read-assimilation',
        },
      }
    );

  assert.strictEqual(
    employeeListing.ok,
    true,
    'manager employee listing failed'
  );

  assert.strictEqual(
    employeeListing.provider,
    'staffology',
    'manager selected the wrong provider'
  );

  assert(
    employeeListing.result.count > 0,
    'no employees were returned'
  );

  assert.strictEqual(
    employeeListing.result.count,
    employeeListing.result.employees.length,
    'employee count mismatch'
  );

  const first =
    employeeListing.result.employees[0];

  assert(
    first.externalEmployeeId,
    'external employee id is missing'
  );

  assert(
    first.fullName,
    'employee name is missing'
  );

  assert.strictEqual(
    first.provider,
    'staffology',
    'employee provider mapping mismatch'
  );

  assert.strictEqual(
    Object.hasOwn(first, 'metadata'),
    false,
    'raw Staffology metadata escaped provider boundary'
  );

  assert.strictEqual(
    Object.hasOwn(first, 'niNumber'),
    false,
    'NI number escaped employee summary boundary'
  );

  const detail =
    await platform.manager.getEmployee(
      {
        employerRef:
          employer.externalEmployerId,

        employeeRef:
          first.externalEmployeeId,
      },
      {
        provider: 'staffology',
        metadata: {
          verification:
            'employee-detail-assimilation',
        },
      }
    );

  assert.strictEqual(
    detail.ok,
    true,
    'manager employee detail failed'
  );

  assert.strictEqual(
    detail.result.employee
      .externalEmployeeId,
    first.externalEmployeeId,
    'employee detail id mismatch'
  );

  assert.strictEqual(
    detail.result.employee.provider,
    'staffology',
    'employee detail provider mismatch'
  );

  assert.strictEqual(
    Object.hasOwn(
      detail.result.employee.personal,
      'nationalInsuranceNumber'
    ),
    false,
    'NI number escaped canonical detail boundary'
  );

  console.log(
    'Enterprise Payroll Employee Assimilation'
  );

  console.log(
    '----------------------------------------'
  );

  console.log(
    `Provider: ${employeeListing.provider}`
  );

  console.log(
    `Employer: ${employer.name}`
  );

  console.log(
    `Employees: ${employeeListing.result.count}`
  );

  for (
    const employee of
    employeeListing.result.employees
  ) {
    console.log(
      `- ${employee.fullName}`
    );

    console.log(
      `  ID: ${employee.externalEmployeeId}`
    );

    console.log(
      `  Payroll code: ${
        employee.payrollCode || 'not supplied'
      }`
    );
  }

  console.log('');

  console.log(
    `Detail verified: ` +
    `${detail.result.employee.fullName}`
  );

  console.log('');

  console.log(
    '✅ Enterprise employee read assimilation passed'
  );
}

run().catch((error) => {
  console.error('');

  console.error(
    '❌ Enterprise employee read assimilation failed'
  );

  console.error(error);
  process.exit(1);
});
