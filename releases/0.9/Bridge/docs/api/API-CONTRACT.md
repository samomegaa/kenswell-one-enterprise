# Kenswell One Bridge API Contract

## Base Path

```text
/api/client-portal
Response Envelope
Success
{
  "success": true,
  "data": {},
  "meta": {}
}
Created

Created resources should return HTTP 201 using the same success envelope.

Error
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "The requested resource was not found"
  },
  "meta": {
    "requestId": "..."
  }
}
Request ID

Every request receives an X-Request-Id response header.

Clients may send:

X-Request-Id

If provided, Bridge preserves it.

Rate Limiting

API responses may include:

RateLimit-Limit
RateLimit-Remaining
RateLimit-Reset

When the limit is exceeded, Bridge returns:

HTTP 429

with:

{
  "success": false,
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests"
  }
}
CORS

Production deployments should set:

CLIENT_PORTAL_ALLOWED_ORIGINS
Security Headers

Bridge sends security headers including:

X-Content-Type-Options
X-Frame-Options
Referrer-Policy
Permissions-Policy
Content-Security-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
Authentication

Protected client portal routes require:

Authorization: Bearer <token>
Current Endpoint Inventory

See:

docs/api/ENDPOINT-INVENTORY.md

