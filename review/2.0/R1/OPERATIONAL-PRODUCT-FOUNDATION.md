# Operational Product Foundation

## Product contract

```text
Dashboard
Payroll
RTI
Employees
HMRC
Pensions
Reports
Organisation
```

## Composition boundary

```text
Product section contract
        ↓
Operational workspace registry
        ↓
Provider capability metadata
        ↓
Navigation presentation model
        ↓
Existing Staffology workspace
```

R1 does not invent Staffology response fields and does not introduce API
calls. It records which existing workspaces are available, foundational,
or planned.

## Availability

- `available`: an existing operational workspace is present.
- `foundation`: part of the capability exists but needs product composition.
- `planned`: the Version 2 operational workspace remains to be built.
