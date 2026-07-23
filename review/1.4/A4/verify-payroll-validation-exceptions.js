const fs = require('fs');
const path = require('path');

const root = process.cwd();
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/validation-exceptions'
);

const requiredFiles = [
  'payrollValidationContract.js',
  'payrollValidationResolver.js',
  'adaptStaffologyPayrollValidation.js',
  'payrollValidationPresentation.js',
  'payrollValidationPresentationModel.js',
  'usePayrollValidationFilters.js',
  'PayrollValidationSummary.jsx',
  'PayrollValidationToolbar.jsx',
  'PayrollValidationTable.jsx',
  'StaffologyPayrollValidationExceptions.jsx',
  'payroll-validation-exceptions.css',
  'index.js',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(base, file))) {
    throw new Error(
      `Missing validation-exceptions file: ${file}`
    );
  }
}

const indexSource = fs.readFileSync(
  path.join(base, 'index.js'),
  'utf8'
);

for (const symbol of [
  'StaffologyPayrollValidationExceptions',
  'adaptStaffologyPayrollValidation',
  'createPayrollValidationPresentationModel',
  'resolvePayrollValidationCollection',
]) {
  if (!indexSource.includes(symbol)) {
    throw new Error(
      `Missing validation-exceptions export: ${symbol}`
    );
  }
}

const workspaceSource = fs.readFileSync(
  path.join(
    root,
    'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace.jsx'
  ),
  'utf8'
);

for (const marker of [
  'StaffologyPayrollValidationExceptions',
  'payrollRun={model.current}',
]) {
  if (!workspaceSource.includes(marker)) {
    throw new Error(
      `Payroll Run validation integration missing: ${marker}`
    );
  }
}

const componentSource = fs.readFileSync(
  path.join(base, 'StaffologyPayrollValidationExceptions.jsx'),
  'utf8'
);

for (const marker of [
  'Payroll validations unavailable',
  'Validation results',
  'cannot be corrected, dismissed, or waived',
]) {
  if (!componentSource.includes(marker)) {
    throw new Error(
      `Validation behaviour missing: ${marker}`
    );
  }
}

const presentationSource = fs.readFileSync(
  path.join(base, 'payrollValidationPresentation.js'),
  'utf8'
);

for (const severity of [
  "'Error'",
  "'Warning'",
  "'Information'",
  "'Unavailable'",
]) {
  if (!presentationSource.includes(severity)) {
    throw new Error(
      `Severity presentation missing: ${severity}`
    );
  }
}

console.log(
  'Staffology Payroll Validation & Exceptions verification passed'
);
