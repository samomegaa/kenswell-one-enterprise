#!/usr/bin/env node

const assert = require('assert');
const {
  EmployeeRepository,
  EmployeeRepositoryService,
  EmployeeConflictError,
  EmployeeNotFoundError,
} = require(
  '../../../src/enterprise/employees'
);

function run() {
  const repository =
    new EmployeeRepository();
  const service =
    new EmployeeRepositoryService({
      repository,
    });

  const employee = service.create({
    clientId: 'client_demo',
    employerId: 'employer_demo',
    identity: {
      firstName: 'James',
      lastName: 'Ibori',
    },
    employment: {
      status: 'current',
      payrollCode: '1',
    },
    provider: {
      provider: 'staffology',
      externalEmployeeId:
        'staffology_employee_1',
      externalEmployerId:
        'staffology_employer_1',
    },
  });

  assert.strictEqual(repository.count(), 1);
  assert.strictEqual(
    service.get(employee.id).id,
    employee.id
  );
  assert.strictEqual(
    service.listForClient('client_demo').length,
    1
  );
  assert.strictEqual(
    service.listForEmployer('employer_demo').length,
    1
  );
  assert.strictEqual(
    repository.findByExternalReference({
      provider: 'staffology',
      externalEmployeeId:
        'staffology_employee_1',
    }).id,
    employee.id
  );

  assert.throws(
    () => service.create({
      clientId: 'client_demo',
      employerId: 'employer_demo',
      identity: {
        displayName: 'Duplicate Employee',
      },
      provider: {
        provider: 'staffology',
        externalEmployeeId:
          'staffology_employee_1',
      },
    }),
    EmployeeConflictError
  );

  assert.throws(
    () => service.get('employee_missing'),
    EmployeeNotFoundError
  );

  const removed = service.remove(employee.id);
  assert.strictEqual(removed.id, employee.id);
  assert.strictEqual(repository.count(), 0);

  console.log('Enterprise Employee Repository');
  console.log('------------------------------');
  console.log(`Created: ${employee.identity.displayName}`);
  console.log('Client lookup: passed');
  console.log('Employer lookup: passed');
  console.log('Provider uniqueness: passed');
  console.log('Remove boundary: passed');
  console.log('');
  console.log('✅ Enterprise Employee Repository passed');
}

try { run(); } catch (error) {
  console.error('❌ Enterprise Employee Repository failed');
  console.error(error);
  process.exit(1);
}
