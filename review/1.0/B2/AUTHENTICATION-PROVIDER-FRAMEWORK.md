# Release 1.0-B2 — Enterprise Authentication Provider Framework

## Objective

Introduce an Enterprise authentication provider framework.

## Purpose

Applications should authenticate through the Enterprise Authentication Service rather than directly implementing provider-specific login logic.

## Providers Registered

- Local Authentication
- OAuth 2.0
- OpenID Connect
- SAML
- Microsoft Entra ID
- Google Workspace

## Current Default Provider

```text
local
Current Enabled Provider
local
Disabled Placeholder Providers

The following providers are registered but disabled:

oauth2
oidc
saml
entra
google
Design Decision

Provider implementations are replaceable.

Bridge and future Enterprise applications should call:

runtime.authenticate(...)

rather than provider-specific methods.

Future Work

Future releases should add:

password hashing integration
password policy enforcement
refresh token lifecycle
MFA
WebAuthn
OIDC discovery
SAML metadata support
Microsoft Entra ID integration
Google Workspace integration
