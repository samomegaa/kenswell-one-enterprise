const { MetricType } = require('./metric-types');
const { MetricError } = require('./observability-errors');

class MetricsRegistry {
  constructor() {
    this.metrics = new Map();
  }

  ensureMetric(name, type, metadata = {}) {
    if (!name || typeof name !== 'string') {
      throw new MetricError('metric name is required');
    }

    if (!Object.values(MetricType).includes(type)) {
      throw new MetricError('invalid metric type', { name, type });
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, Object.freeze({
        name,
        type,
        value: type === MetricType.HISTOGRAM ? [] : 0,
        metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }

    return this.metrics.get(name);
  }

  increment(name, amount = 1, metadata = {}) {
    const existing = this.ensureMetric(name, MetricType.COUNTER, metadata);

    if (existing.type !== MetricType.COUNTER) {
      throw new MetricError('metric is not a counter', { name });
    }

    const updated = Object.freeze({
      ...existing,
      value: existing.value + amount,
      updatedAt: new Date().toISOString(),
    });

    this.metrics.set(name, updated);
    return updated;
  }

  gauge(name, value, metadata = {}) {
    const existing = this.ensureMetric(name, MetricType.GAUGE, metadata);

    if (existing.type !== MetricType.GAUGE) {
      throw new MetricError('metric is not a gauge', { name });
    }

    const updated = Object.freeze({
      ...existing,
      value,
      updatedAt: new Date().toISOString(),
    });

    this.metrics.set(name, updated);
    return updated;
  }

  observe(name, value, metadata = {}) {
    const existing = this.ensureMetric(name, MetricType.HISTOGRAM, metadata);

    if (existing.type !== MetricType.HISTOGRAM) {
      throw new MetricError('metric is not a histogram', { name });
    }

    const updated = Object.freeze({
      ...existing,
      value: [...existing.value, value],
      updatedAt: new Date().toISOString(),
    });

    this.metrics.set(name, updated);
    return updated;
  }

  timer(name, durationMs, metadata = {}) {
    this.ensureMetric(name, MetricType.TIMER, metadata);

    const existing = this.metrics.get(name);

    if (existing.type !== MetricType.TIMER) {
      throw new MetricError('metric is not a timer', { name });
    }

    const current = Array.isArray(existing.value) ? existing.value : [];

    const updated = Object.freeze({
      ...existing,
      value: [...current, durationMs],
      updatedAt: new Date().toISOString(),
    });

    this.metrics.set(name, updated);
    return updated;
  }

  get(name) {
    return this.metrics.get(name) || null;
  }

  list() {
    return Array.from(this.metrics.values());
  }

  clear() {
    this.metrics.clear();
  }
}

const defaultMetricsRegistry = new MetricsRegistry();

module.exports = {
  MetricsRegistry,
  defaultMetricsRegistry,
};
