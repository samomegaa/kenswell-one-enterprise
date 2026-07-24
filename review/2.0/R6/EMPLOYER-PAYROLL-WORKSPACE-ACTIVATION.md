# Employer Payroll Workspace Activation

## Runtime flow

```text
EnterpriseRuntimeProvider
        ↓
EmployerRuntimeProvider
        ↓
usePayrollEmployerContext
        ↓
ActivatedPayrollWorkspace
        ↓
PayrollSessionProvider
        ↓
PayrollOperationalWorkspace
        ↓
StaffologyPayrollRunWorkspace
```

## Rules

- Enterprise employer runtime remains the employer state owner.
- Payroll stores activation metadata only.
- Employer changes replace the active Payroll session.
- Missing employer context clears the Payroll session.
- Staffology payroll behaviour is unchanged.
