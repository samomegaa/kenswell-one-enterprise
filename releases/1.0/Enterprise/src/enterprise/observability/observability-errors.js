class EnterpriseObservabilityError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'EnterpriseObservabilityError';
    this.details = details;
    this.statusCode = 500;
  }
}

class MetricError extends EnterpriseObservabilityError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'MetricError';
  }
}

class TraceError extends EnterpriseObservabilityError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = 'TraceError';
  }
}

module.exports = {
  EnterpriseObservabilityError,
  MetricError,
  TraceError,
};
