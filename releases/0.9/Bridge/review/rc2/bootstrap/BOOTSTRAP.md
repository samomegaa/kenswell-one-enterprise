# RC2-A2 — Startup Bootstrap, Health Checks & Graceful Shutdown

## Objective

Introduce the runtime shell required for production operation.

## Added Components

- Express app factory
- Startup bootstrap
- Health service
- Health routes
- Readiness route
- Liveness route
- Graceful shutdown handling

## Health Endpoints

```text
GET /health
GET /ready
GET /live
