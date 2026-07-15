const {
  getEnterprisePayrollPlatform,
} = require('./enterprise-payroll-runtime');

function freezeEmployer(employer) {
  return Object.freeze({
    externalEmployerId:
      employer.externalEmployerId ||
      employer.id ||
      null,
    name:
      employer.name ||
      employer.legalName ||
      'Unnamed employer',
    legalName:
      employer.legalName ||
      employer.name ||
      null,
    startTaxYear:
      employer.startTaxYear ||
      employer.startYear ||
      null,
    currentTaxYear:
      employer.currentTaxYear ||
      employer.currentYear ||
      null,
    archived:
      employer.archived === true,
  });
}

class ProviderEmployerService {
  async listStaffologyEmployers() {
    const platform =
      getEnterprisePayrollPlatform();

    const health =
      await platform.manager.checkHealth(
        'staffology'
      );

    if (health.available !== true) {
      const error = new Error(
        health.message ||
        'Staffology provider is unavailable'
      );

      error.statusCode = 502;
      throw error;
    }

    const result =
      await platform.manager.listEmployers({
        provider: 'staffology',
      });

    const sourceEmployers =
      Array.isArray(result)
        ? result
        : (
          result.employers ||
          result.items ||
          result.result?.employers ||
          result.result?.items ||
          result.data?.employers ||
          result.data?.items ||
          []
        );

    const employers = Object.freeze(
      sourceEmployers.map(freezeEmployer)
    );

    return Object.freeze({
      provider:
        result.provider ||
        result.result?.provider ||
        result.data?.provider ||
        'staffology',

      count:
        result.count ??
        result.result?.count ??
        result.data?.count ??
        employers.length,

      employers,

      retrievedAt:
        result.retrievedAt ||
        result.result?.retrievedAt ||
        result.data?.retrievedAt ||
        new Date().toISOString(),
    });
  }
}

module.exports = {
  ProviderEmployerService,
  freezeEmployer,
};
