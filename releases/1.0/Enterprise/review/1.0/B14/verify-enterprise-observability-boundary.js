const {
  MetricsRegistry,
  MetricType,
  Tracer,
  HealthSignalRegistry,
  HealthStatus,
  startTimer,
  timeAsync,
  enterpriseObservabilityMiddleware,
} = require('../../../src/enterprise/observability');

const core = require('../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const metrics = new MetricsRegistry();

  const counter = metrics.increment('requests.total');
  metrics.increment('requests.total', 2);

  assert(counter.type === MetricType.COUNTER, 'counter type mismatch');
  assert(metrics.get('requests.total').value === 3, 'counter value mismatch');

  const gauge = metrics.gauge('workers.active', 5);

  assert(gauge.type === MetricType.GAUGE, 'gauge type mismatch');
  assert(metrics.get('workers.active').value === 5, 'gauge value mismatch');

  metrics.observe('payload.size', 100);
  metrics.observe('payload.size', 250);

  assert(metrics.get('payload.size').value.length === 2, 'histogram value mismatch');

  metrics.timer('operation.duration_ms', 15);
  metrics.timer('operation.duration_ms', 25);

  assert(metrics.get('operation.duration_ms').value.length === 2, 'timer metric mismatch');

  const timer = startTimer();
  const duration = timer.stop();

  assert(typeof duration === 'number', 'timer duration invalid');

  const timed = await timeAsync(async () => {
    return {
      completed: true,
    };
  });

  assert(timed.result.completed === true, 'timeAsync result mismatch');

  const tracer = new Tracer();

  const span = tracer.startSpan({
    name: 'verification.span',
    enterpriseContext: {
      requestId: 'req_observe',
      correlationId: 'corr_observe',
      tenant: {
        id: 'tenant_observe',
      },
      identity: {
        userId: 'user_observe',
      },
    },
  });

  assert(span.traceId.startsWith('trace_'), 'traceId invalid');
  assert(span.spanId.startsWith('span_'), 'spanId invalid');

  const endedSpan = tracer.endSpan(span, {
    status: 'completed',
  });

  assert(endedSpan.status === 'completed', 'span status mismatch');
  assert(typeof endedSpan.durationMs === 'number', 'span duration invalid');
  assert(tracer.listSpans().length === 1, 'span list mismatch');

  const health = new HealthSignalRegistry();

  health.set('database', HealthStatus.HEALTHY);
  health.set('queue', HealthStatus.DEGRADED);

  const summary = health.summary();

  assert(summary.status === HealthStatus.DEGRADED, 'health summary mismatch');

  health.set('database', HealthStatus.UNHEALTHY);

  const unhealthySummary = health.summary();

  assert(unhealthySummary.status === HealthStatus.UNHEALTHY, 'unhealthy summary mismatch');

  assert(typeof enterpriseObservabilityMiddleware === 'function', 'observability middleware not exported');
  assert(core.observability, 'observability not exported from core');
  assert(typeof core.observability.MetricsRegistry === 'function', 'core metrics export invalid');
  assert(typeof core.observability.Tracer === 'function', 'core tracer export invalid');

  console.log('✅ Enterprise Observability and Metrics Boundary verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
