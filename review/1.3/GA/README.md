# Release 1.3-GA — Staffology Organisation Foundation

## Purpose

This release consolidates the complete Staffology Organisation Foundation
without introducing a new provider contract or write operation.

## Certified workspaces

- Organisation Dashboard
- Organisation Overview
- Departments
- Cost Centres
- Payroll Calendar
- Organisation Pay Elements

## GA principles

- Read-only organisation runtime
- Existing runtime contracts only
- Explicit unavailable states
- No conversion of unavailable collections into zero
- Dashboard as the default organisation landing page
- Modular resolver, adapter and presentation layers
- Successful Staffology verification and production build

## Verification

```bash
npm run verify:staffology:organisation:1.3
```

The aggregate verifier runs the Version 1.3 milestone verifiers that are
present, the GA checks, the Staffology verification suite and the frontend
production build.
