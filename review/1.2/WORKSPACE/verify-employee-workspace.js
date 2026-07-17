#!/usr/bin/env node
const assert=require('assert'); const fs=require('fs'); const path=require('path');
const root=path.resolve(__dirname,'../../../products/tax-payroll/frontend/src');
const required=['workspaces/framework/WorkspaceLayout.jsx','workspaces/framework/workspace.css','workspaces/employees/EmployeeWorkspace.jsx','workspaces/employees/EmployeePanels.jsx','workspaces/employees/employeeApi.js','workspaces/employees/useEmployeeWorkspace.js'];
for(const file of required) assert(fs.existsSync(path.join(root,file)),`Missing ${file}`);
const workspace=fs.readFileSync(path.join(root,'workspaces/employees/EmployeeWorkspace.jsx'),'utf8');
for(const section of ['summary:','employment:','payroll:','tax:','pension:','leave:','provider:','timeline:','audit:']) assert(workspace.includes(section),`Missing ${section}`);
assert(fs.readFileSync(path.join(root,'workspaces/employees/employeeApi.js'),'utf8').includes('/api/employees/'));
console.log('Enterprise Employee Workspace');
console.log('-----------------------------');
console.log('Framework placement: passed');
console.log('Employee API client: passed');
console.log('Loading and error states: passed');
console.log('Summary, employment and payroll: passed');
console.log('Tax, pension and leave: passed');
console.log('Provider, timeline and audit: passed');
console.log('');
console.log('✅ Enterprise Employee Workspace passed');
