const HealthStatus = Object.freeze({
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
});

class HealthSignalRegistry {
  constructor() {
    this.signals = new Map();
  }

  set(name, status = HealthStatus.HEALTHY, metadata = {}) {
    const signal = Object.freeze({
      name,
      status,
      metadata,
      checkedAt: new Date().toISOString(),
    });

    this.signals.set(name, signal);
    return signal;
  }

  get(name) {
    return this.signals.get(name) || null;
  }

  list() {
    return Array.from(this.signals.values());
  }

  summary() {
    const signals = this.list();

    if (signals.some((signal) => signal.status === HealthStatus.UNHEALTHY)) {
      return Object.freeze({
        status: HealthStatus.UNHEALTHY,
        signals,
      });
    }

    if (signals.some((signal) => signal.status === HealthStatus.DEGRADED)) {
      return Object.freeze({
        status: HealthStatus.DEGRADED,
        signals,
      });
    }

    return Object.freeze({
      status: HealthStatus.HEALTHY,
      signals,
    });
  }

  clear() {
    this.signals.clear();
  }
}

const defaultHealthSignals = new HealthSignalRegistry();

module.exports = {
  HealthStatus,
  HealthSignalRegistry,
  defaultHealthSignals,
};
