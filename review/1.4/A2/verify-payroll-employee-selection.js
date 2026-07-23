const fs = require('fs');
const path = require('path');

const root = process.cwd();
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/employee-selection'
);

const requiredFiles = [
  'employeeSelectionContract.js',
  'employeeSelectionResolver.js',
  'adaptStaffologyPayrollEmployees.js',
  'employeeSelectionPresentation.js',
  'employeeSelectionPresentationModel.js',
  'EmployeeSelectionToolbar.jsx',
  'EmployeeSelectionTable.jsx',
  'StaffologyPayrollEmployeeSelection.jsx',
  'employee-selection.css',
  'index.js',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(base, file))) {
    throw new Error(
      `Missing employee-selection file: ${file}`
    );
  }
}

const indexSource = fs.readFileSync(
  path.join(base, 'index.js'),
  'utf8'
);

for (const symbol of [
  'StaffologyPayrollEmployeeSelection',
  'adaptStaffologyPayrollEmployees',
  'createEmployeeSelectionPresentationModel',
  'resolvePayrollEmployeeCollection',
]) {
  if (!indexSource.includes(symbol)) {
    throw new Error(
      `Missing employee-selection export: ${symbol}`
    );
  }
}

const workspacePath = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace.jsx'
);

const workspaceSource = fs.readFileSync(
  workspacePath,
  'utf8'
);

for (const marker of [
  'StaffologyPayrollEmployeeSelection',
  'payrollRun={model.current}',
]) {
  if (!workspaceSource.includes(marker)) {
    throw new Error(
      `Payroll Run integration missing marker: ${marker}`
    );
  }
}

const selectionSource = fs.readFileSync(
  path.join(base, 'StaffologyPayrollEmployeeSelection.jsx'),
  'utf8'
);

for (const marker of [
  'Payroll employees unavailable',
  'Selection is local and read-only',
  'selectVisible',
  'toggleEmployee',
]) {
  if (!selectionSource.includes(marker)) {
    throw new Error(
      `Employee selection behaviour missing: ${marker}`
    );
  }
}

const modelSource = fs.readFileSync(
  path.join(base, 'employeeSelectionPresentationModel.js'),
  'utf8'
);

if (!modelSource.includes('totalCount')) {
  throw new Error(
    'Employee selection model lacks total count'
  );
}

console.log(
  'Staffology Payroll Employee Selection verification passed'
);
