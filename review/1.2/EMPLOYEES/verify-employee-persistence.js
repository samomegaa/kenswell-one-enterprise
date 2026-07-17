#!/usr/bin/env node

const assert = require('assert');

const {
  MemoryPersistenceAdapter,
  PersistenceRegistry,
} = require(
  '../../../src/enterprise/persistence'
);

const {
  createEmployee,
  EmployeePersistenceAdapter,
  EmployeePersistenceService,
  createEmployeePersistence,
} = require(
  '../../../src/enterprise/employees'
);

async function run() {
  const storage =
    new MemoryPersistenceAdapter();

  const persistence =
    new EmployeePersistenceAdapter({
      adapter: storage,
    });

  const events = [];

  const service =
    new EmployeePersistenceService({
      persistence,
      eventBus: {
        publish: async (
          type,
          payload
        ) => {
          events.push({
            type,
            payload,
          });
        },
      },
    });

  const employee =
    createEmployee({
      id: 'employee_demo',
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
        payFrequency: 'monthly',
        basicPay: 1000,
      },
      provider: {
        provider: 'staffology',
        externalEmployeeId:
          'staffology_employee_1',
        externalEmployerId:
          'staffology_employer_1',
      },
    });

  const created =
    await service.create(employee);

  assert.strictEqual(
    created.identity.displayName,
    'Mr James Ibori'
  );

  const found =
    await service.get(employee.id);

  assert.strictEqual(
    found.id,
    employee.id
  );

  const clientResult =
    await service.listForClient(
      'client_demo'
    );

  assert.strictEqual(
    clientResult.count,
    1
  );

  const external =
    await persistence
      .findByExternalReference({
        provider: 'staffology',
        externalEmployeeId:
          'staffology_employee_1',
      });

  assert.strictEqual(
    external.id,
    employee.id
  );

  const changed = Object.freeze({
    ...found,
    payroll: Object.freeze({
      ...found.payroll,
      basicPay: 1250,
    }),
  });

  const updated =
    await service.update(changed);

  assert.strictEqual(
    updated.version,
    2
  );

  assert.strictEqual(
    updated.payroll.basicPay,
    1250
  );

  const registry =
    new PersistenceRegistry();

  const registered =
    createEmployeePersistence({
      registry,
      name: 'employees-test',
    });

  assert.strictEqual(
    registry.require(
      'employees-test'
    ),
    registered
  );

  assert.strictEqual(
    events.length,
    2
  );

  const removed =
    await service.remove(employee.id);

  assert.strictEqual(
    removed.id,
    employee.id
  );

  assert.strictEqual(
    await persistence.count(),
    0
  );

  console.log(
    'Enterprise Employee Persistence'
  );
  console.log(
    '-------------------------------'
  );
  console.log(
    'Adapter contract: passed'
  );
  console.log(
    'Mapper round-trip: passed'
  );
  console.log(
    'Client lookup: passed'
  );
  console.log(
    'Provider lookup: passed'
  );
  console.log(
    'Versioning: passed'
  );
  console.log(
    'Registry integration: passed'
  );
  console.log(
    'Transaction service: passed'
  );
  console.log('');
  console.log(
    '✅ Enterprise Employee Persistence passed'
  );
}

run().catch((error) => {
  console.error(
    '❌ Enterprise Employee Persistence failed'
  );
  console.error(error);
  process.exit(1);
});
