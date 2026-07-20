'use strict';

const {
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
} = require('./staffology-catalogue-constants');

const coreOperations = require(
  './staffology-core-operations'
);

const employeeOperations = require(
  './staffology-employee-operations'
);

const workspaceOperations = require(
  './staffology-workspace-operations'
);

function freezeOperation(operation) {
  return Object.freeze({
    ...operation,
    staffologyPath:
      operation.staffologyPath || null,
    access:
      operation.access || ACCESS.UNKNOWN,
    status:
      operation.status || STATUS.UNKNOWN,
    dataClassification: Object.freeze(
      operation.dataClassification || []
    ),
    workspaceTabs: Object.freeze(
      operation.workspaceTabs || []
    ),
    notes: operation.notes || null,
  });
}

const operations = [
  ...coreOperations,
  ...employeeOperations,
  ...workspaceOperations,
].map(freezeOperation);

module.exports = Object.freeze({
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
  operations: Object.freeze(operations),
});
