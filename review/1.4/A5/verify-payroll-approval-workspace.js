const fs = require('fs');
const path = require('path');
const root = process.cwd();
const base = path.join(root, 'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/approval');
const requiredFiles = [
  'payrollApprovalContract.js',
  'payrollApprovalResolver.js',
  'adaptStaffologyPayrollApproval.js',
  'payrollApprovalPresentation.js',
  'payrollApprovalPresentationModel.js',
  'PayrollApprovalSummary.jsx',
  'PayrollApprovalReadiness.jsx',
  'PayrollApprovalTimeline.jsx',
  'StaffologyPayrollApprovalWorkspace.jsx',
  'payroll-approval.css',
  'payroll-approval-responsive.css',
  'index.js',
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(base, file))) throw new Error(`Missing approval-workspace file: ${file}`);
}
const indexSource = fs.readFileSync(path.join(base, 'index.js'), 'utf8');
for (const symbol of [
  'StaffologyPayrollApprovalWorkspace',
  'adaptStaffologyPayrollApproval',
  'createPayrollApprovalPresentationModel',
  'resolvePayrollApproval',
]) {
  if (!indexSource.includes(symbol)) throw new Error(`Missing approval-workspace export: ${symbol}`);
}
const workspaceSource = fs.readFileSync(
  path.join(root, 'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace.jsx'),
  'utf8'
);
for (const marker of ['StaffologyPayrollApprovalWorkspace', 'payrollRun={model.current}']) {
  if (!workspaceSource.includes(marker)) throw new Error(`Payroll Run approval integration missing: ${marker}`);
}
const componentSource = fs.readFileSync(path.join(base, 'StaffologyPayrollApprovalWorkspace.jsx'), 'utf8');
for (const marker of ['Payroll approval unavailable', 'Approval readiness', 'cannot approve, reject, reopen']) {
  if (!componentSource.includes(marker)) throw new Error(`Approval workspace behaviour missing: ${marker}`);
}
console.log('Staffology Payroll Approval Workspace verification passed');
