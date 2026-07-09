# Release 1.0-B3 — Enterprise Authorization (RBAC) Engine

## Objective

Introduce a platform-wide authorization engine.

## Purpose

Applications should ask the Enterprise RBAC service whether an action is permitted instead of inspecting user roles directly.

## Core API

```text
runtime.can(userOrUserId, permission)
runtime.rbac.can(userOrUserId, permission)
runtime.rbac.permissions(userOrUserId)
Permission Model

Permissions use dot notation:

domain.action

Examples:

documents.read
documents.approve
tasks.assign
tenant.manage
Wildcards

The engine supports wildcard grants:

*
documents.*
messages.*
tasks.*
approvals.*
Enterprise Roles
owner
admin
manager
staff
client
Design Decision

RBAC is a platform service.

Bridge and future modules should not hard-code authorization rules.

Future Work

Future releases should add:

tenant-specific role overrides
organisation-level permission scopes
department and team scopes
ABAC policy evaluation
audit hooks for denied actions
permission-aware route middleware
