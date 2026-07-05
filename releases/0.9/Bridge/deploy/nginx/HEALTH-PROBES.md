# Bridge Health Probes

## Endpoints

```text
GET /live
GET /health
GET /ready

4. Add health probe document
cat > releases/0.9/Bridge/deploy/nginx/HEALTH-PROBES.md <<'EOF'
# Bridge Health Probes

## Endpoints

```text
GET /live
GET /health
GET /ready
Meaning
/live

The process is alive.

/health

The application is running and can respond.

/ready

The application is ready to receive traffic.

Recommended Probe Behaviour
ProbeEndpointFailure Action
Liveness/liverestart process/container
Readiness/readyremove from load balancer
Health/healthalert / diagnostics
Docker / Orchestrator Recommendation

Use /ready for traffic routing and /live for process restart decisions.
