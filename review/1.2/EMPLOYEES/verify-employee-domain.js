#!/usr/bin/env node
const assert = require('assert');
const { createEmployee, createEmployeeAuditEvent, EMPLOYMENT_STATUSES } = require('../../../src/enterprise/employees');
function run() {
  const employee = createEmployee({ clientId:'client_demo', employerId:'employer_demo', identity:{ title:'Mr', firstName:'James', lastName:'Ibori' }, employment:{ status:'current', payrollCode:'1' }, payroll:{ payFrequency:'monthly', basicPay:1000 }, tax:{ taxCode:'1257L' }, nationalInsurance:{ category:'A' }, provider:{ provider:'staffology', externalEmployeeId:'external_employee_demo', externalEmployerId:'external_employer_demo' } });
  assert(employee.id.startsWith('employee_'));
  assert.strictEqual(employee.identity.displayName,'Mr James Ibori');
  assert.strictEqual(employee.employment.status,'current');
  assert.strictEqual(employee.payroll.basicPay,1000);
  assert.strictEqual(employee.provider.provider,'staffology');
  assert(EMPLOYMENT_STATUSES.includes('leaver'));
  const audit=createEmployeeAuditEvent({ employeeId:employee.id, type:'employee.created' });
  assert.strictEqual(audit.type,'employee.created');
  console.log('Enterprise Employee Domain');
  console.log('--------------------------');
  console.log(`Employee: ${employee.identity.displayName}`);
  console.log(`Status: ${employee.employment.status}`);
  console.log(`Provider: ${employee.provider.provider}`);
  console.log('');
  console.log('✅ Enterprise Employee Domain passed');
}
try { run(); } catch (error) { console.error('❌ Enterprise Employee Domain failed'); console.error(error); process.exit(1); }
