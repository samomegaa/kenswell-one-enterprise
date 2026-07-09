const PlatformOperationType = Object.freeze({
  HEALTH: 'health',
  DIAGNOSTIC: 'diagnostic',
  RUNTIME: 'runtime',
  MAINTENANCE: 'maintenance',
  METRICS: 'metrics',
  CONFIGURATION: 'configuration',
  INFORMATION: 'information',
});

const PlatformOperationStatus = Object.freeze({
  REGISTERED: 'registered',
  AVAILABLE: 'available',
  DISABLED: 'disabled',
  FAILED: 'failed',
});

module.exports = {
  PlatformOperationType,
  PlatformOperationStatus,
};
