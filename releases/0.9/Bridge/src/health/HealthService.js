class HealthService {
  constructor({ startedAt = new Date(), config = null } = {}) {
    this.startedAt = startedAt;
    this.config = config;
    this.ready = false;
  }

  markReady() {
    this.ready = true;
  }

  markNotReady() {
    this.ready = false;
  }

  live() {
    return {
      status: 'live',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  health() {
    return {
      status: 'ok',
      startedAt: this.startedAt.toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: this.config?.app?.environment || process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };
  }

  readiness() {
    return {
      status: this.ready ? 'ready' : 'not_ready',
      ready: this.ready,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = HealthService;
