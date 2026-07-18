'use strict';

const {
  createCanonicalPayrollWorkspace,
  createVisibleWorkspaceSchema,
  createReadinessDashboard,
} = require('../../payroll/workspace');

const {
  createProviderPanel,
} = require('../../payroll/workspace/provider');

function resolveProviderSummary(employee = {}) {
  const provider = employee.provider || {};

  return {
    provider: provider.provider || 'staffology',
    employeeId:
      provider.externalEmployeeId ||
      provider.employeeId ||
      employee.id ||
      null,
    employerId:
      provider.externalEmployerId ||
      provider.employerId ||
      employee.employerId ||
      null,
    contractFingerprint:
      provider.contractFingerprint ||
      employee.contractFingerprint ||
      null,
    contractVersion:
      provider.contractVersion || '1.0',
    lastSynchronisedAt:
      provider.lastSynchronisedAt || null,
    synchronisationState:
      provider.synchronisationState ||
      (provider.externalEmployeeId
        ? 'in-sync'
        : 'never-synced'),
  };
}

function resolveProviderDiagnostics(employee = {}) {
  const provider = employee.provider || {};

  return {
    apiVersion: provider.apiVersion || 'v1',
    connection: provider.connection || 'unknown',
    latencyMs: provider.latencyMs ?? null,
    authentication:
      provider.authentication || 'unknown',
    lastSuccessfulSync:
      provider.lastSuccessfulSync ||
      provider.lastSynchronisedAt ||
      null,
    lastFailedSync:
      provider.lastFailedSync || null,
    retryCount: provider.retryCount || 0,
    lastError: provider.lastError || null,
  };
}

class EmployeeWorkspaceService {
  constructor({
    employeeService,
    workspaceFactory =
      createCanonicalPayrollWorkspace,
  } = {}) {
    if (!employeeService) {
      throw new TypeError(
        'Employee API service is required'
      );
    }

    this.employeeService = employeeService;
    this.workspaceFactory = workspaceFactory;
  }

  async get(employeeId) {
    const employee =
      await this.employeeService.get(employeeId);

    const workspace = this.workspaceFactory();

    const visibleWorkspace =
      createVisibleWorkspaceSchema({
        schema: workspace.schema,
        employee,
      });

    const readiness =
      createReadinessDashboard({
        engine: workspace.readinessEngine,
        schema: workspace.schema,
        employee,
        employeeVersion:
          employee.version ?? null,
        workspaceVersion:
          workspace.schema.version,
        contractFingerprint:
          employee.provider
            ?.contractFingerprint ||
          employee.contractFingerprint ||
          null,
      });

    const providerPanel = createProviderPanel({
      summary: resolveProviderSummary(employee),
      diagnostics:
        resolveProviderDiagnostics(employee),
      history:
        employee.provider?.history || [],
      conflicts:
        employee.provider?.conflicts || [],
    });

    return Object.freeze({
      employee,
      workspaceSchema: workspace.schema,
      visibleWorkspace,
      readiness,
      providerPanel,
      contract: Object.freeze({
        source:
          workspace.schema.metadata
            .sourceContract,
        fingerprint:
          providerPanel.summary
            .contractFingerprint,
        version:
          providerPanel.summary
            .contractVersion,
      }),
      metadata: Object.freeze({
        providerNeutralPresentation:
          workspace.schema.metadata
            .providerNeutralPresentation,
        generatedAt:
          readiness.timeline.calculatedAt,
      }),
    });
  }
}

function createEmployeeWorkspaceService(options) {
  return new EmployeeWorkspaceService(options);
}

module.exports = {
  EmployeeWorkspaceService,
  createEmployeeWorkspaceService,
  resolveProviderSummary,
  resolveProviderDiagnostics,
};
