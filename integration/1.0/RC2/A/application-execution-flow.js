const core = require('../../../../packages/core/src');

function buildApplicationExecutionFlow() {
  return Object.freeze({
    security: core.security,
    context: core.context,
    application: core.application,
    domain: core.domain,
    workflow: core.workflow,
    transactions: core.transactions,
    audit: core.audit,
    logging: core.logging,
    observability: core.observability,
  });
}

module.exports = {
  buildApplicationExecutionFlow,
};
