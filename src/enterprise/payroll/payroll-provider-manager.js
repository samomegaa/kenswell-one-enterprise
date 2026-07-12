const {
  PayrollProviderStatus,
  PayrollCapability,
} = require('./payroll-types');

const {
  PayrollProviderRegistry,
} = require('./payroll-provider-registry');

const {
  PayrollProviderCapabilityError,
  PayrollProviderExecutionError,
} = require('./payroll-errors');

const OPERATION_CAPABILITY = Object.freeze({
  listEmployers: PayrollCapability.EMPLOYERS,
  getEmployer: PayrollCapability.EMPLOYERS,
  createEmployer: PayrollCapability.EMPLOYERS,
  createPaySchedule: PayrollCapability.PAY_SCHEDULES,
  listEmployees: PayrollCapability.EMPLOYEES,
  getEmployee: PayrollCapability.EMPLOYEES,
  createEmployee: PayrollCapability.EMPLOYEES,
  upsertPayInstruction: PayrollCapability.PAY_INSTRUCTIONS,
  runPayroll: PayrollCapability.PAYROLL_CALCULATION,
  submitFps: PayrollCapability.FPS,
  submitEps: PayrollCapability.EPS,
  submitNvr: PayrollCapability.NVR,
  getJob: PayrollCapability.JOB_STATUS,
});

class EnterprisePayrollProviderManager {
  constructor({
    registry = new PayrollProviderRegistry(),
    configuration = null,
    integrations = null,
    scheduler = null,
    notifications = null,
    audit = null,
    eventBus = null,
  } = {}) {
    this.registry = registry;
    this.configuration = configuration;
    this.integrations = integrations;
    this.scheduler = scheduler;
    this.notifications = notifications;
    this.audit = audit;
    this.eventBus = eventBus;
  }

  register(provider, options = {}) {
    return this.registry.register(provider, options);
  }

  list() {
    return this.registry.list();
  }

  get(name) {
    return this.registry.get(name);
  }

  getDefault() {
    return this.registry.getDefault();
  }

  makeAvailable(name, health = null) {
    return this.registry.updateStatus(
      name,
      PayrollProviderStatus.AVAILABLE,
      health
    );
  }

  makeUnavailable(name, health = null) {
    return this.registry.updateStatus(
      name,
      PayrollProviderStatus.UNAVAILABLE,
      health
    );
  }

  selectProvider({
    provider = null,
    capability,
  } = {}) {
    if (!capability) {
      throw new PayrollProviderCapabilityError(
        'payroll capability is required'
      );
    }

    if (provider) {
      const record = this.registry.get(provider);

      if (!record.provider.supports(capability)) {
        throw new PayrollProviderCapabilityError(
          'preferred payroll provider does not support capability',
          {
            provider,
            capability,
          }
        );
      }

      if (record.status !== PayrollProviderStatus.AVAILABLE) {
        throw new PayrollProviderExecutionError(
          'preferred payroll provider is not available',
          {
            provider,
            capability,
            status: record.status,
          }
        );
      }

      return record;
    }

    const defaultRecord = this.registry.getDefault();

    if (
      defaultRecord.status === PayrollProviderStatus.AVAILABLE &&
      defaultRecord.provider.supports(capability)
    ) {
      return defaultRecord;
    }

    const available = this.registry.findByCapability(
      capability,
      true
    );

    if (available.length === 0) {
      throw new PayrollProviderExecutionError(
        'no available payroll provider supports capability',
        {
          capability,
        }
      );
    }

    return available[0];
  }

  createExecutionContext(record, operation, metadata = {}) {
    return Object.freeze({
      providerName: record.name,
      providerMode: record.provider.mode,
      operation,
      capability: OPERATION_CAPABILITY[operation],

      configuration: this.configuration,
      integrations: this.integrations,
      scheduler: this.scheduler,
      notifications: this.notifications,
      audit: this.audit,
      eventBus: this.eventBus,

      metadata: Object.freeze({ ...metadata }),
      createdAt: new Date().toISOString(),
    });
  }

  async execute(
    operation,
    input = {},
    options = {}
  ) {
    const capability = OPERATION_CAPABILITY[operation];

    if (!capability) {
      throw new PayrollProviderCapabilityError(
        'unsupported payroll manager operation',
        { operation }
      );
    }

    const record = this.selectProvider({
      provider: options.provider || null,
      capability,
    });

    const provider = record.provider;
    const context = this.createExecutionContext(
      record,
      operation,
      options.metadata || {}
    );

    const startedAt = new Date().toISOString();

    try {
      const result = await provider[operation](
        input,
        context
      );

      this.registry.updateStatus(
        record.name,
        PayrollProviderStatus.AVAILABLE,
        {
          available: true,
          lastOperation: operation,
          checkedAt: new Date().toISOString(),
        }
      );

      return Object.freeze({
        ok: true,
        provider: record.name,
        operation,
        capability,
        result,
        startedAt,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      this.registry.updateStatus(
        record.name,
        PayrollProviderStatus.FAILED,
        {
          available: false,
          lastOperation: operation,
          error: error.message,
          checkedAt: new Date().toISOString(),
        }
      );

      throw new PayrollProviderExecutionError(
        'payroll provider operation failed',
        {
          provider: record.name,
          operation,
          capability,
          error: error.message,
        }
      );
    }
  }

  listEmployers(input = {}, options = {}) {
    return this.execute(
      'listEmployers',
      input,
      options
    );
  }

  getEmployer(input, options = {}) {
    return this.execute(
      'getEmployer',
      input,
      options
    );
  }

  createEmployer(input, options = {}) {
    return this.execute(
      'createEmployer',
      input,
      options
    );
  }

  createPaySchedule(input, options = {}) {
    return this.execute(
      'createPaySchedule',
      input,
      options
    );
  }

  listEmployees(input, options = {}) {
    return this.execute(
      'listEmployees',
      input,
      options
    );
  }

  getEmployee(input, options = {}) {
    return this.execute(
      'getEmployee',
      input,
      options
    );
  }

  createEmployee(input, options = {}) {
    return this.execute(
      'createEmployee',
      input,
      options
    );
  }

  upsertPayInstruction(input, options = {}) {
    return this.execute(
      'upsertPayInstruction',
      input,
      options
    );
  }

  runPayroll(input, options = {}) {
    return this.execute(
      'runPayroll',
      input,
      options
    );
  }

  submitFps(input, options = {}) {
    return this.execute(
      'submitFps',
      input,
      options
    );
  }

  submitEps(input, options = {}) {
    return this.execute(
      'submitEps',
      input,
      options
    );
  }

  submitNvr(input, options = {}) {
    return this.execute(
      'submitNvr',
      input,
      options
    );
  }

  getJob(input, options = {}) {
    return this.execute(
      'getJob',
      input,
      options
    );
  }

  async checkHealth(name) {
    const record = this.registry.get(name);

    try {
      const health = await record.provider.healthCheck();

      this.registry.updateStatus(
        name,
        health.available === true
          ? PayrollProviderStatus.AVAILABLE
          : PayrollProviderStatus.UNAVAILABLE,
        health
      );

      return Object.freeze({
        provider: name,
        ...health,
      });
    } catch (error) {
      this.registry.updateStatus(
        name,
        PayrollProviderStatus.FAILED,
        {
          available: false,
          error: error.message,
          checkedAt: new Date().toISOString(),
        }
      );

      throw new PayrollProviderExecutionError(
        'payroll provider health check failed',
        {
          provider: name,
          error: error.message,
        }
      );
    }
  }

  async checkAllHealth() {
    const results = [];

    for (const record of this.registry.list()) {
      try {
        results.push(await this.checkHealth(record.name));
      } catch (error) {
        results.push(
          Object.freeze({
            provider: record.name,
            available: false,
            error: error.message,
          })
        );
      }
    }

    return Object.freeze(results);
  }
}

function createEnterprisePayrollProviderManager(options = {}) {
  return new EnterprisePayrollProviderManager(options);
}

module.exports = {
  OPERATION_CAPABILITY,
  EnterprisePayrollProviderManager,
  createEnterprisePayrollProviderManager,
};
