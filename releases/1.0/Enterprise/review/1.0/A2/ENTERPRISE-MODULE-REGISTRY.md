# Release 1.0-A2 — Enterprise Module Registry

## Objective

Introduce the first Enterprise Core primitive: a module registry.

## Purpose

The module registry records which Enterprise apps and platform modules exist, their status, whether they are enabled, and what capabilities they expose.

## Current Modules

- Bridge
- Practice Core
- Finance
- Identity
- Enterprise Admin

## Important Decision

Bridge remains the only stable enabled module.

Other Enterprise modules are registered as planned and disabled until their foundations are implemented.

## Bridge Baseline

Bridge remains sourced from:

```text
releases/0.9/Bridge

he Enterprise app placeholder remains:

apps/bridge
Next Step

1.0-A3 should introduce Enterprise Feature Flags so modules and capabilities can be enabled or disabled consistently.
