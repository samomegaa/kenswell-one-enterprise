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

  return Object.freeze({
    schema:
      fieldRegistry.createWorkspaceDefinition(),
    workspaceRegistry,
    fieldRegistry,
    renderer,
  });
}

module.exports = {
  createCanonicalPayrollWorkspace,
};
