# Kenswell One Enterprise Architecture

## Purpose

Kenswell One Enterprise 1.0 evolves Bridge from a single product release into a modular enterprise platform.

## Target Structure

```text
apps/
  bridge/
  practice/
  finance/
  compliance/
  identity/
  analytics/
  admin/

packages/
  config/
  auth/
  logging/
  security/
  events/
  database/
  ui/
  sdk/
  observability/

infrastructure/
  docker/
  nginx/
  monitoring/
  deployment/

docs/
scripts/
release/
review/
Principle

Bridge 0.9.0 is the stable GA baseline.

Enterprise 1.0 introduces the permanent platform structure around it without breaking the released Bridge code.
