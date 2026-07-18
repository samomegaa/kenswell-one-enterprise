'use strict';
const assert = require('assert');
const { StaffologyEmployerDirectory, EmployerCache, EmployerDiscoveryService } = require('../../../../src/enterprise/employers');
const { EmployerScopedEmployeeService } = require('../../../../apps/api/src/services/employer-scoped-employee-service');
const { EmployerWorkspaceService } = require('../../../../apps/api/src/services/employer-workspace-service');
async function main() {
  const calls = [];
  const client = { async get(path) {
    calls.push(path);
    if (path === '/employers') return { items:[{ id:'employer-001', name:'Enterprise Employer' }] };
    if (path === '/employers/employer-001/employees') return { items:[{ id:'employee-001', firstName:'Test' }] };
    if (path === '/employers/employer-001/employees/employee-001') return { id:'employee-001', firstName:'Test' };
    throw new Error(`Unexpected path: ${path}`);
  }};
  const directory = new StaffologyEmployerDirectory({ client });
  const employerService = new EmployerDiscoveryService({ directory, cache:new EmployerCache({ ttlMilliseconds:60000 }) });
  const employers = await employerService.list();
  assert.strictEqual(employers.length,1); assert.strictEqual(employers[0].id,'employer-001');
  console.log('PASS  Employer discovery');
  await employerService.list();
  assert.strictEqual(calls.filter((path)=>path==='/employers').length,1);
  console.log('PASS  Employer discovery cache');
  const employeeService = new EmployerScopedEmployeeService({ client, mapEmployee:(employee,context)=>({ ...employee, employerId:context.employerId }) });
  const employees = await employeeService.list('employer-001');
  assert.strictEqual(employees.length,1); assert.strictEqual(employees[0].employerId,'employer-001');
  console.log('PASS  Employer-scoped employees');
  const workspaceService = new EmployerWorkspaceService({ employeeService, createWorkspaceService:({ employeeService:scoped })=>({ async get(employeeId){ return { employee:await scoped.get(employeeId), metadata:{ employerId:'employer-001' } }; } }) });
  const workspace = await workspaceService.get('employer-001','employee-001');
  assert.strictEqual(workspace.employee.id,'employee-001');
  console.log('PASS  Employer workspace context');
  console.log(
  '\n? RC1-H1 Employer Runtime passed'
);
}
main().catch((error) => {
  console.error(
    '\n❌ RC1-H1 failed'
  );
  console.error(error);
  process.exitCode = 1;
});
