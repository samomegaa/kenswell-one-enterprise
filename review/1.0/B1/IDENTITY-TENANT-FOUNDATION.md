# Release 1.0-B1 — Enterprise Identity & Tenant Foundation

## Objective

Introduce the first Enterprise identity and tenancy primitives.

## Platform Concepts

- Tenant
- Organisation
- User
- Role

## Services Added

- TenantRegistry
- OrganisationRegistry
- IdentityService

## Runtime Composition

The Enterprise Runtime now composes:

- Module Registry
- Feature Flags
- Event Bus
- Tenant Registry
- Organisation Registry
- Identity Service

## Design Decision

Identity, tenant and organisation are platform-level services.

They are not owned by Bridge or any future application module.

## Future Work

1.0-B2 should introduce Enterprise Authentication Provider abstraction for:

- Local accounts
- OAuth2
- OIDC
- SAML
- Microsoft Entra ID
- Google Workspace
