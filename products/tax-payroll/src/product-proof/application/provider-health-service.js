const {
  getEnterprisePayrollPlatform,
} = require('./enterprise-payroll-runtime');

function normaliseHealth(name, health) {
  const available = health?.available === true;

  return Object.freeze({
    name,
    status: available ? 'connected' : 'attention',
    available,
    message:
      health?.message ||
      (available
        ? 'Provider connection is healthy'
        : 'Provider is unavailable'),
    checkedAt:
      health?.checkedAt ||
      new Date().toISOString(),
  });
}

class ProviderHealthService {
  async getProviderCentre() {
    const platform =
      getEnterprisePayrollPlatform();

    const staffology =
      await platform.manager.checkHealth(
        'staffology'
      );

    return Object.freeze({
      connectedProviders:
        staffology.available === true ? 1 : 0,
      providers: Object.freeze([
        normaliseHealth('staffology', staffology),
        Object.freeze({
          name: 'brightpay',
          status: 'coming_soon',
          available: false,
          message: 'Provider integration is planned',
          checkedAt: null,
        }),
        Object.freeze({
          name: 'moneysoft',
          status: 'coming_soon',
          available: false,
          message: 'Provider integration is planned',
          checkedAt: null,
        }),
      ]),
    });
  }
}

module.exports = {
  ProviderHealthService,
  normaliseHealth,
};
