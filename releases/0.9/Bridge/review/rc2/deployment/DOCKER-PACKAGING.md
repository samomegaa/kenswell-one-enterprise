# RC2-C1 — Production Docker & Runtime Packaging

## Objective

Add production packaging for Kenswell One Bridge API and Client Portal.

## Added

- API Dockerfile
- Client Portal Dockerfile
- Client Portal NGINX config
- Docker Compose baseline
- Docker environment example
- Root .dockerignore
- Packaging verification script

## Services

### bridge-api

Runs:

```text
node src/server.js

Exposes:

3000
bridge-client-portal

Serves the React production build through NGINX.

Exposes:

80
Compose File
releases/0.9/Bridge/deploy/docker/docker-compose.bridge.yml
Environment Example
releases/0.9/Bridge/deploy/docker/.env.bridge.example
Production Note

This is a packaging baseline. Before live production deployment, RC2-C2 should add:

health checks
reverse proxy config
TLS strategy
persistent database strategy
image tagging
deployment rollback steps
