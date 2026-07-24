# Payroll Period Activation & Operational Lifecycle

## Runtime composition

```text
Enterprise employer runtime
        ↓
PayrollSessionProvider
        ↓
PayrollPeriodProvider
        ↓
PayrollOperationalWorkspace
        ↓
StaffologyPayrollRunWorkspace
```

## Lifecycle

```text
created
activated
employee-selection
calculation
validation
approval
fps-preparation
submitted
closed
```

## Boundaries

- Employer state remains owned by Enterprise runtime.
- Employer activation remains owned by the R6 payroll session.
- R7 owns payroll-period activation metadata only.
- Staffology payroll behaviour remains unchanged.
