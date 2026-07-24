# Employer Runtime Selection and Payroll Context

## Context flow

```text
EnterpriseRuntimeProvider
        ↓
EmployerRuntimeProvider
        ↓
useEmployerRuntime
        ↓
usePayrollEmployerContext
        ↓
PayrollOperationalWorkspace
        ↓
StaffologyPayrollRunWorkspace
```

## Rules

- No duplicate employer state is created.
- The existing EmployerSelector changes the active employer.
- The existing runtime persistence boundary retains selection.
- Payroll receives a normalized employer-scoped runtime workspace.
- No employee, pay period or calculation data is fabricated.
- A missing employer continues to show the guarded selection state.
