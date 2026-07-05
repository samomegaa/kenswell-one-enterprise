# RC1-C — Security Review & Hardening Baseline

## Objective

Establish a security baseline for Bridge before production hardening.

## Areas Reviewed

### Authentication

- JWT signing requires CLIENT_PORTAL_JWT_SECRET
- Password hashing uses bcryptjs
- Invitation activation requires valid token and password length check
- Account lockout exists after repeated login failures

### Environment

Required variables:

- DATABASE_URL
- CLIENT_PORTAL_JWT_SECRET

### HTTP Security

Baseline middleware introduced:

- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security in production

### CORS

CORS guard introduced using:

- CLIENT_PORTAL_ALLOWED_ORIGINS

### Upload Security

Existing safeguards:

- MIME type allowlist
- Maximum file size
- Storage provider abstraction
- No direct public file path exposure

### Audit Coverage

Audit coverage exists for:

- Login/session-related events
- Portal dashboard views
- Document request/upload/review
- Secure messages
- Tasks
- Approvals
- Activity views

## RC1-C Findings

- Security baseline established.
- Full rate limiting should be added in RC1-C.1 or RC2.
- Helmet may be considered in production API app.
- CORS should be locked down before production.
- JWT refresh/rotation strategy should be considered before GA.

## Recommendation

Proceed to deeper hardening only after baseline middleware and environment checks are wired into the eventual API application entrypoint.
