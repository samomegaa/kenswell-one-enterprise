# RC3-A — Performance Validation & Load Testing

## Objective

Create measurable performance validation tooling for Kenswell One Bridge before 0.9.0 GA.

## Added

- API benchmark script
- Concurrent load simulator
- Memory profiler
- Event-loop delay profiler
- Performance report generator
- Performance suite verifier

## Metrics

The suite records:

- average latency
- median latency
- P95 latency
- P99 latency
- failures
- requests per second
- memory usage
- event-loop delay

## Notes

The first version is dependency-light and can run safely in local/dev environments.

For realistic results, run against a live Bridge API process:

```bash
BRIDGE_BASE_URL=http://localhost:3000 npm run bridge:rc3:benchmark
BRIDGE_BASE_URL=http://localhost:3000 npm run bridge:rc3:load
npm run bridge:rc3:memory
npm run bridge:rc3:performance-report
