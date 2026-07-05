# RC2-C3 — Reverse Proxy, TLS & Health Probes

## Objective

Add production reverse proxy and TLS-ready configuration for Bridge.

## Added

- HTTP reverse proxy baseline
- TLS reverse proxy baseline
- API upstream
- Client portal upstream
- Health probe routing
- TLS hardening defaults
- Health probe documentation

## Routing

| Public Path | Upstream |
|---|---|
| /api/client-portal/ | Bridge API |
| /health | Bridge API |
| /ready | Bridge API |
| /live | Bridge API |
| / | Client Portal |

## TLS Notes

The TLS config is a template. Before production use:

- replace `portal.example.com`
- confirm certificate paths
- run `nginx -t`
- reload NGINX
- verify HTTPS redirects
- verify `/ready`, `/health`, and `/live`

## Production Recommendation

RC2-D should automate config validation and deployment through CI/CD.
