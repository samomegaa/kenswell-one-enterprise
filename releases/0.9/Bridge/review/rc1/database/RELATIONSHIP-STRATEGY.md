# RC1-D.2 — Database Constraints & Relationship Strategy

## Objective

Define the database relationship and constraint strategy for Bridge before applying production-grade schema constraints.

## Current Position

Bridge currently has the core tables and indexes required for the client portal platform.

RC1-D.1 confirmed:

- 10 migrations
- 10 models
- 0 model registration warnings

## Relationship Strategy

### Primary Entity

```text
clients
portal_matters
portal_documents
archived_at
deleted_at
status
