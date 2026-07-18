'use strict';

const {
  createSectionReadiness,
} = require('./section-readiness');

function createReadinessDashboard({
  engine,
  schema,
  employee = {},
  employeeVersion = null,
  contractFingerprint = null,
  workspaceVersion = null,
  calculatedAt = new Date().toISOString(),
} = {}) {
  if (!engine) {
    throw new TypeError(
      'Payroll readiness engine is required'
    );
  }

  if (!schema) {
    throw new TypeError(
      'Payroll workspace schema is required'
    );
  }

  return Object.freeze({
    levels: engine.evaluate(employee),
    sections: createSectionReadiness({
      schema,
      employee,
    }),
    timeline: Object.freeze({
      calculatedAt,
      employeeVersion,
      workspaceVersion:
        workspaceVersion || schema.version || null,
      contractFingerprint,
    }),
  });
}

module.exports = {
  createReadinessDashboard,
};
