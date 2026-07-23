# Release 1.4-A2 — Staffology Payroll Employee Selection

This release introduces read-only local employee selection inside the Payroll Run workspace.

## Verification

```bash
node review/1.4/A2/verify-payroll-employee-selection.js
```

The release must also pass:

```bash
node review/1.4/A1/verify-payroll-run-workspace.js
npm run verify:staffology
cd products/tax-payroll/frontend && npm run build
```
