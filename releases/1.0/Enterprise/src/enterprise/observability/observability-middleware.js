const { defaultMetricsRegistry } = require('./metrics-registry');
const { defaultTracer } = require('./tracer');
const { defaultHealthSignals } = require('./health-signals');
const { startTimer } = require('./timer');

function enterpriseObservabilityMiddleware({
  metrics = defaultMetricsRegistry,
  tracer = defaultTracer,
  health = defaultHealthSignals,
} = {}) {
  return function attachEnterpriseObservability(req, res, next) {
    const requestTimer = startTimer();

    req.metrics = metrics;
    req.tracer = tracer;
    req.healthSignals = health;

    const span = tracer.startSpan({
      name: 'http.request',
      enterpriseContext: req.enterpriseContext || null,
      metadata: {
        method: req.method,
        path: req.originalUrl || req.url,
      },
    });

    res.on('finish', () => {
      const durationMs = requestTimer.stop();

      metrics.increment('http.requests.total', 1);
      metrics.timer('http.requests.duration_ms', durationMs, {
        method: req.method,
        path: req.originalUrl || req.url,
      });
      metrics.gauge('http.response.status_code', res.statusCode);

      tracer.endSpan(span, {
        status: res.statusCode >= 500 ? 'failed' : 'completed',
        metadata: {
          statusCode: res.statusCode,
          durationMs,
        },
      });
    });

    return next();
  };
}

module.exports = {
  enterpriseObservabilityMiddleware,
};
