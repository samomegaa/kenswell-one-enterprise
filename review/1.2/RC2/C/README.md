# Release 1.2 RC2-C

## Staffology Employee Workspace Foundation

RC2-C aligns the Kenswell One employee workspace with the
Staffology employee API and its payroll information structure.

## Current platform decision

Staffology is the exclusive payroll provider used by the current
Kenswell One payroll runtime.

The architecture may retain provider boundaries for future use,
but RC2-C will not reduce Staffology data into an artificially
generic provider model.

## Primary employee workspace

- Basic Details
- Employment
- Pay Options
- Attachment Orders
- Bank Account
- Leave
- Pension
- Notes
- More

## Pay Options subsections

- Regular Pay
- Additions & Deductions
- Loans
- Tax & NI
- Other
- Benefits

## Pension subsections

- Settings
- Assessments
- Refunds

## Release boundary

RC2-C begins as a read-only workspace.

No employee update, payroll amendment, pension action, leave
creation or other provider mutation is introduced until the
corresponding Staffology write operation has been separately
verified and protected by Kenswell authorisation and audit controls.
