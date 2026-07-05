# Security Checklist

## Environment

- [x] Required env vars defined
- [x] Env validation utility added
- [ ] Production secrets reviewed
- [ ] Example env file finalised

## Authentication

- [x] Password hashing present
- [x] JWT signing present
- [x] Auth middleware present
- [x] Account lockout present
- [ ] Refresh token strategy reviewed
- [ ] Session expiry policy reviewed

## HTTP

- [x] Security headers middleware added
- [x] CORS guard added
- [ ] Rate limiting added
- [ ] Request body size limits wired into app entrypoint

## Uploads

- [x] MIME allowlist
- [x] File size limit
- [x] Storage abstraction
- [ ] Virus scanning strategy reviewed
- [ ] Real object storage provider reviewed

## Audit

- [x] Audit service present
- [x] Audit middleware present
- [x] Client portal events covered
- [ ] Audit retention policy defined
