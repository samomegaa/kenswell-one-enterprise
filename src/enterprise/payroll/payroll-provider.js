const {
  PayrollProviderMode,
  PayrollCapability,
} = require('./payroll-types');

const {
  PayrollProviderRegistrationError,
  PayrollProviderCapabilityError,
} = require('./payroll-errors');

const {
  providerImplementsCapability,
} = require('./payroll-capabilities');

class EnterprisePayrollProvider {
  constructor({
    name,
    displayName = null,
    mode = PayrollProviderMode.LIVE,
    capabilities = [],
    metadata = {},
  } = {}) {
    if (!name || typeof name !== 'string') {
      throw new PayrollProviderRegistrationError(
        'payroll provider name is required'
      );
    }

    if (!Object.values(PayrollProviderMode).includes(mode)) {
      throw new PayrollProviderRegistrationError(
        'valid payroll provider mode is required',
        {
          provider: name,
          mode,
        }
      );
    }

    const invalidCapabilities = capabilities.filter(
      (capability) =>
        !Object.values(PayrollCapability).includes(capability)
    );

    if (invalidCapabilities.length > 0) {
      throw new PayrollProviderRegistrationError(
        'invalid payroll provider capabilities supplied',
        {
          provider: name,
          invalidCapabilities,
        }
      );
    }

    this.name = name.trim().toLowerCase();
    this.displayName = displayName || name;
    this.mode = mode;
    this.capabilities = Object.freeze([
      ...new Set(capabilities),
    ]);
    this.metadata = Object.freeze({ ...metadata });
  }

  supports(capability) {
    return (
      this.capabilities.includes(capability) &&
      providerImplementsCapability(this, capability)
    );
  }

  requireCapability(capability) {
    if (!this.supports(capability)) {
      throw new PayrollProviderCapabilityError(
        'payroll provider does not support required capability',
        {
          provider: this.name,
          capability,
        }
      );
    }

    return true;
  }

  describe() {
    return Object.freeze({
      name: this.name,
      displayName: this.displayName,
      mode: this.mode,
      capabilities: this.capabilities,
      metadata: this.metadata,
    });
  }

  async healthCheck() {
    return Object.freeze({
      provider: this.name,
      available: true,
      checkedAt: new Date().toISOString(),
    });
  }

  async listEmployers() {
    return this.notImplemented('listEmployers');
  }

  async getEmployer() {
    return this.notImplemented('getEmployer');
  }

  async createEmployer() {
    return this.notImplemented('createEmployer');
  }

  async createPaySchedule() {
    return this.notImplemented('createPaySchedule');
  }

  async listEmployees() {
    return this.notImplemented('listEmployees');
  }

  async getEmployee() {
    return this.notImplemented('getEmployee');
  }

  async createEmployee() {
    return this.notImplemented('createEmployee');
  }

  async upsertPayInstruction() {
    return this.notImplemented('upsertPayInstruction');
  }

  async runPayroll() {
    return this.notImplemented('runPayroll');
  }

  async submitFps() {
    return this.notImplemented('submitFps');
  }

  async submitEps() {
    return this.notImplemented('submitEps');
  }

  async submitNvr() {
    return this.notImplemented('submitNvr');
  }

  async getJob() {
    return this.notImplemented('getJob');
  }

  notImplemented(operation) {
    throw new PayrollProviderCapabilityError(
      'payroll provider operation is not implemented',
      {
        provider: this.name,
        operation,
      }
    );
  }
}

module.exports = {
  EnterprisePayrollProvider,
};
