'use strict';

const {
  createWorkspaceSchemaRegistry,
} = require('./workspace-schema-registry');

const {
  createPayrollFieldRegistry,
} = require('./field-registry');

const {
  DEFAULT_PAYROLL_FIELDS,
} = require('./default-payroll-fields');

const {
  createDynamicFieldRenderer,
} = require('./dynamic-field-renderer');

const {
  registerDefaultControlRenderers,
} = require('./default-control-renderers');

const {
  createPayrollReadinessEngine,
} = require('./readiness-engine');

function createCanonicalPayrollWorkspace({
  fields = DEFAULT_PAYROLL_FIELDS,
} = {}) {
  const workspaceRegistry =
    createWorkspaceSchemaRegistry();

  const fieldRegistry =
    createPayrollFieldRegistry({
      workspaceRegistry,
      fields,
    });

  const renderer =
    registerDefaultControlRenderers(
      createDynamicFieldRenderer()
    );

  const schema =
    fieldRegistry.createWorkspaceDefinition();

  const readinessEngine =
    createPayrollReadinessEngine({
      fieldRegistry,
    });

  return Object.freeze({
    schema,
    workspaceRegistry,
    fieldRegistry,
    renderer,
    readinessEngine,
  });
}

module.exports = {
  createCanonicalPayrollWorkspace,
};
