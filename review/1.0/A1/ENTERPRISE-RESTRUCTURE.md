# Release 1.0-A1 — Enterprise Platform Foundation

## Objective

Create the permanent Kenswell One Enterprise repository structure.

## Completed

- Enterprise apps directory added
- Bridge app placeholder added
- Shared packages directory added
- Infrastructure directory added
- Enterprise documentation directory added
- Enterprise scripts directory added
- 1.0 release directory added
- Review directory added

## Important Decision

The released Bridge 0.9.0 source remains in:

```text
releases/0.9/Bridge
Bridge is not moved during this step.

This preserves the approved GA baseline and avoids introducing risk immediately after release.

Next Step

1.0-A2 should introduce the Enterprise module registry and begin formalising how Enterprise apps are discovered and loaded.
