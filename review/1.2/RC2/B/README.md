# Release 1.2 RC2-B

## Enterprise Employee Workspace

RC2-B replaces the temporary runtime JSON inspector with a structured,
production-oriented employee workspace.

## Scope

- Runtime employee identity header
- Employee workspace navigation
- Overview
- Personal details
- Employment
- Payroll
- Tax
- Pension
- Leave
- Provider data
- Timeline
- Audit
- Responsive workspace styling

## Architectural boundary

The provider remains the source of runtime employee data.

The frontend workspace:

1. receives the provider workspace payload;
2. adapts that payload into a stable presentation model;
3. renders business-oriented workspace sections;
4. preserves raw provider data only as a diagnostic view.

No employee mutations are introduced by RC2-B.
