#!/usr/bin/env node

const assert = require('assert');

const {
  MemoryPersistenceAdapter,
} = require(
  '../../../src/enterprise/persistence'
);

const {
  EmployeePersistenceAdapter,
  EmployeePersistenceService,
  EmployeeApiService,
  createEmployeeController,
} = require(
  '../../../src/enterprise/employees'
);

function responseRecorder() {
  return {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

async function run() {
  const adapter =
    new MemoryPersistenceAdapter();

  const employeePersistence =
    new EmployeePersistenceAdapter({
      adapter,
    });

  const persistence =
    new EmployeePersistenceService({
      persistence:
        employeePersistence,
    });

  const service =
    new EmployeeApiService({
      persistence,
    });

  const controller =
    createEmployeeController({
      service,
    });

  const createRes =
    responseRecorder();

  await controller.create(
    {
      body: {
        id: 'employee_api_demo',
        clientId: 'client_demo',
        employerId: 'employer_demo',
        identity: {
          title: 'Mr',
          firstName: 'James',
          lastName: 'Ibori',
        },
        employment: {
          status: 'current',
          payrollCode: '1',
        },
        payroll: {
          basicPay: 1000,
        },
        provider: {
          provider: 'staffology',
          externalEmployeeId:
            'staffology_employee_api',
        },
      },
      params: {},
      headers: {},
    },
    createRes
  );

  assert.strictEqual(
    createRes.statusCode,
    201
  );

  const employee =
    createRes.payload.data;

  assert.strictEqual(
    employee.identity.displayName,
    'Mr James Ibori'
  );

  const listRes =
    responseRecorder();

  await controller.list(
    {
      params: {},
      headers: {},
    },
    listRes
  );

  assert.strictEqual(
    listRes.payload.data.count,
    1
  );

  const getRes =
    responseRecorder();

  await controller.get(
    {
      params: {
        employeeId: employee.id,
      },
      headers: {},
    },
    getRes
  );

  assert.strictEqual(
    getRes.payload.data.id,
    employee.id
  );

  const updateRes =
    responseRecorder();

  await controller.update(
    {
      params: {
        employeeId: employee.id,
      },
      body: {
        version: 1,
        payroll: {
          basicPay: 1250,
        },
      },
      headers: {},
    },
    updateRes
  );

  assert.strictEqual(
    updateRes.payload.data.version,
    2
  );

  assert.strictEqual(
    updateRes.payload.data
      .payroll.basicPay,
    1250
  );

  const clientRes =
    responseRecorder();

  await controller.listForClient(
    {
      params: {
        clientId: 'client_demo',
      },
      headers: {},
    },
    clientRes
  );

  assert.strictEqual(
    clientRes.payload.data.count,
    1
  );

  const providerRes =
    responseRecorder();

  await controller.findByProvider(
    {
      params: {
        provider: 'staffology',
        externalEmployeeId:
          'staffology_employee_api',
      },
      headers: {},
    },
    providerRes
  );

  assert.strictEqual(
    providerRes.payload.data.id,
    employee.id
  );

  const conflictRes =
    responseRecorder();

  await controller.update(
    {
      params: {
        employeeId: employee.id,
      },
      body: {
        version: 1,
        payroll: {
          basicPay: 1500,
        },
      },
      headers: {},
    },
    conflictRes
  );

  assert.strictEqual(
    conflictRes.statusCode,
    409
  );

  const deleteRes =
    responseRecorder();

  await controller.remove(
    {
      params: {
        employeeId: employee.id,
      },
      headers: {},
    },
    deleteRes
  );

  assert.strictEqual(
    deleteRes.statusCode,
    200
  );

  const missingRes =
    responseRecorder();

  await controller.get(
    {
      params: {
        employeeId: employee.id,
      },
      headers: {},
    },
    missingRes
  );

  assert.strictEqual(
    missingRes.statusCode,
    404
  );

  console.log(
    'Enterprise Employee API Boundary'
  );
  console.log(
    '--------------------------------'
  );
  console.log(
    'Create employee: passed'
  );
  console.log(
    'List employees: passed'
  );
  console.log(
    'Get employee: passed'
  );
  console.log(
    'Update and versioning: passed'
  );
  console.log(
    'Client lookup: passed'
  );
  console.log(
    'Provider lookup: passed'
  );
  console.log(
    'Delete employee: passed'
  );
  console.log(
    'API error contract: passed'
  );
  console.log('');
  console.log(
    '✅ Enterprise Employee API Boundary passed'
  );
}

run().catch((error) => {
  console.error(
    '❌ Enterprise Employee API Boundary failed'
  );
  console.error(error);
  process.exit(1);
});
