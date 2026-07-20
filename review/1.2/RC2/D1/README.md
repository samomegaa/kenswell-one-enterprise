# Release 1.2 RC2-D1

## Enterprise Engineering Tooling

D1 introduces reusable verification tooling for Kenswell One.

## Scope

- Modular verification runner
- Shared file and contract assertions
- Staffology catalogue verification module
- Staffology workspace verification module
- Focused npm commands
- Aggregate verification command

## Design requirements

- Verification modules should remain small.
- A failed verification must return a non-zero exit code.
- Verification output must identify the failing module.
- Tooling must not require production employee data.
- No production runtime or interface change is introduced.
