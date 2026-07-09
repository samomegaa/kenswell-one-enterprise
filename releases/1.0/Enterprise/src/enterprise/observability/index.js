const {
  MetricsRegistry,
  defaultMetricsRegistry,
} = require('./metrics-registry');

const { MetricType } = require('./metric-types');

const {
  Tracer,
  defaultTracer,
  createTraceId,
  createSpanId,
} = require('./tracer');

const {
  startTimer,
  timeAsync,
} = require('./timer');

const {
  HealthStatus,
  HealthSignalRegistry,
  defaultHealthSignals,
} = require('./health-signals');

const { enterpriseObservabilityMiddleware } = require('./observability-middleware');

const {
  EnterpriseObservabilityError,
  MetricError,
  TraceError,
} = require('./observability-errors');

module.exports = {
  MetricsRegistry,
  defaultMetricsRegistry,
  MetricType,

  Tracer,
  defaultTracer,
  createTraceId,
  createSpanId,

  startTimer,
  timeAsync,

  HealthStatus,
  HealthSignalRegistry,
  defaultHealthSignals,

  enterpriseObservabilityMiddleware,

  EnterpriseObservabilityError,
  MetricError,
  TraceError,
};
