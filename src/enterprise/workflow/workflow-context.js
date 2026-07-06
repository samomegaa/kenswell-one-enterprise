const crypto = require('crypto');
const { EnterpriseWorkflowError } = require('./workflow-errors');

function createWorkflowId() {
  return `wf_${crypto.randomUUID()}`;
}

function createWorkflowContext({
  enterpriseContext,
  auditContext = null,
  workflowName,
  metadata = {},
} = {}) {
  if (!enterpriseContext || typeof enterpriseContext !== 'object') {
    throw new EnterpriseWorkflowError('enterpriseContext is required');
  }

  if (!workflowName || typeof workflowName !== 'string') {
    throw new EnterpriseWorkflowError('workflowName is required');
  }

  return Object.freeze({
    workflowId: createWorkflowId(),
    workflowName,
    startedAt: new Date().toISOString(),
    enterpriseContext,
    auditContext,
    metadata,
  });
}

module.exports = {
  createWorkflowContext,
};
