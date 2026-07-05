# RC2-B1 — HTTP/API Hardening

## Objective

Introduce core HTTP hardening controls for Bridge.

## Added Controls

### Request ID

Every request receives:

```text
X-Request-Id

Request Logging

Each completed request logs:

requestId
method
path
statusCode
durationMs
Body Limits

JSON request body size is controlled by:

MAX_JSON_BODY_SIZE

Default:

1mb
Rate Limiting

Client portal API routes are protected with in-memory rate limiting.

Config variables:

RATE_LIMIT_WINDOW_MS
RATE_LIMIT_MAX
AUTH_RATE_LIMIT_MAX
Notes

The current rate limiter is an in-memory baseline. For multi-instance production deployments, RC2/RC3 should replace it with Redis-backed rate limiting.
