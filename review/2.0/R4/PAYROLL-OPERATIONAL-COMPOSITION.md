# Payroll Operational Composition

## Workflow

1. Employee Selection
2. Calculation
3. Validation
4. Approval
5. FPS Preparation

## Runtime rule

The existing `StaffologyPayrollRunWorkspace` is mounted only when a valid
runtime workspace is available.

Without employer runtime context, the product displays an explicit
selection state. It does not fabricate employer, employee or pay-run data.

## Architecture

```text
Version 2 Payroll section
        ↓
PayrollOperationalWorkspace
        ↓
Runtime context guard
        ↓
StaffologyPayrollRunWorkspace
```
