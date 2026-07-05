# RC2-B2 — Security Headers, CORS Tightening & Compression

## Objective

Strengthen the Bridge HTTP perimeter with improved security headers, tighter CORS behaviour and response compression.

## Added / Improved Controls

### Security Headers

Bridge now sends:

- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- X-Permitted-Cross-Domain-Policies
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy
- Content-Security-Policy
- Strict-Transport-Security in production

### CORS

CORS now supports:

- explicit allowed origins
- preflight OPTIONS handling
- X-Request-Id header
- production restriction when origins are configured

### Compression

Compression is enabled for responses above 1kb.

## Production Note

For production, set:

```text
CLIENT_PORTAL_ALLOWED_ORIGINS=https://your-client-portal-domain.example
NODE_ENV=production
