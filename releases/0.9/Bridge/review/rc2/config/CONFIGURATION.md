# RC2-A1 — Enterprise Configuration Layer

## Objective

Introduce a central configuration layer for Bridge so that application modules no longer need to directly interpret environment variables.

## Config Sections

- app
- auth
- database
- security
- notifications
- storage
- clientPortal

## Required Variables

- DATABASE_URL
- CLIENT_PORTAL_JWT_SECRET

## Recommended Production Variables

- NODE_ENV=production
- APP_NAME=Kenswell One
- PORT=3000
- TRUST_PROXY=loopback
- CLIENT_PORTAL_ALLOWED_ORIGINS=https://portal.example.com
- CLIENT_PORTAL_PUBLIC_URL=https://portal.example.com
- CLIENT_PORTAL_API_BASE_PATH=/api/client-portal
- CLIENT_PORTAL_JWT_EXPIRES_IN=8h
- MAX_JSON_BODY_SIZE=1mb
- RATE_LIMIT_WINDOW_MS=900000
- RATE_LIMIT_MAX=100
- AUTH_RATE_LIMIT_MAX=10
- STORAGE_PROVIDER=null_storage
- NOTIFICATION_PROVIDER=null

## Principle

All future production services should consume configuration through:

```js
const { config } = require('./src/config');
