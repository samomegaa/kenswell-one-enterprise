const fs = require('fs');
const path = require('path');

const root = process.cwd();
const base = path.join(
  root,
  'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/calculation-summary'
);

const requiredFiles = [
  'payrollCalculationContract.js',
  'payrollCalculationResolver.js',
  'adaptStaffologyPayrollCalculation.js',
  'payrollCalculationPresentation.js',
  'payrollCalculationPresentationModel.js',
  'PayrollCalculationMetric.jsx',
  'PayrollCalculationLiabilities.jsx',
  'StaffologyPayrollCalculationSummary.jsx',
  'payroll-calculation-summary.css',
  'index.js',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(base, file))) {
    throw new Error(
      `Missing calculation-summary file: ${file}`
    );
  }
}

const indexSource = fs.readFileSync(
  path.join(base, 'index.js'),
  'utf8'
);

for (const symbol of [
  'StaffologyPayrollCalculationSummary',
  'adaptStaffologyPayrollCalculation',
  'createPayrollCalculationPresentationModel',
  'resolvePayrollCalculation',
]) {
  if (!indexSource.includes(symbol)) {
    throw new Error(
      `Missing calculation-summary export: ${symbol}`
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
  'StaffologyPayrollCalculationSummary',
  'payrollRun={model.current}',
]) {
  if (!workspaceSource.includes(marker)) {
    throw new Error(
      `Payroll Run calculation integration missing: ${marker}`
    );
  }
}

const componentSource = fs.readFileSync(
  path.join(base, 'StaffologyPayrollCalculationSummary.jsx'),
  'utf8'
);

for (const marker of [
  'Payroll calculation unavailable',
  'Calculated payroll totals',
  'No payroll calculation is performed',
]) {
  if (!componentSource.includes(marker)) {
    throw new Error(
      `Calculation summary behaviour missing: ${marker}`
    );
  }
}

const presentationSource = fs.readFileSync(
  path.join(base, 'payrollCalculationPresentation.js'),
  'utf8'
);

if (!presentationSource.includes("'Unavailable'")) {
  throw new Error(
    'Calculation presentation lacks unavailable handling'
  );
}

console.log(
  'Staffology Payroll Calculation Summary verification passed'
);
