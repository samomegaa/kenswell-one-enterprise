'use strict';

const {
  VALIDATION_CHECKS,
  createCheck,
} = require('./validation-checks');

const {
  validateCanonicalContract,
} = require('./canonical-contract-validator');

function resolveWorkspaceGetter(service) {
  if (typeof service?.getWorkspace === 'function') {
    return ({ employeeId, context }) =>
      service.getWorkspace({ employeeId, context });
  }

  if (typeof service?.get === 'function') {
    return ({ employeeId }) => service.get(employeeId);
  }

  throw new TypeError(
    'Employee workspace service must expose get() or getWorkspace()'
  );
}

function createWorkspaceValidationService({
  employeeWorkspaceService,
} = {}) {
  const getWorkspace =
    resolveWorkspaceGetter(employeeWorkspaceService);

  async function validate({
    employeeId,
    context = {},
  }) {
    const workspace = await getWorkspace({
      employeeId,
      context,
    });

    const canonical =
      validateCanonicalContract(workspace);

    const checks = [
      createCheck(
        VALIDATION_CHECKS.EMPLOYEE_RETRIEVAL,
        Boolean(workspace?.employee),
        { employeeId }
      ),
      ...canonical.checks,
      createCheck(
        VALIDATION_CHECKS.WORKSPACE_SCHEMA,
        Boolean(workspace?.workspaceSchema),
        {}
      ),
      createCheck(
        VALIDATION_CHECKS.VISIBLE_WORKSPACE,
        Boolean(workspace?.visibleWorkspace),
        {
          sectionCount:
            workspace?.visibleWorkspace?.sections?.length || 0,
        }
      ),
      createCheck(
        VALIDATION_CHECKS.READINESS,
        Boolean(workspace?.readiness),
        {}
      ),
      createCheck(
        VALIDATION_CHECKS.PROVIDER_PANEL,
        Boolean(workspace?.providerPanel),
        {}
      ),
    ];

    return {
      workspace,
      checks,
      bindings: canonical.bindings,
    };
  }

  return Object.freeze({ validate });
}

module.exports = {
  createWorkspaceValidationService,
  resolveWorkspaceGetter,
};
