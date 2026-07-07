const core = require('../../../../packages/core/src');

function buildDomainOperationFlow() {
  return Object.freeze({
    application: core.application,
    domain: core.domain,
    context: core.context,
  });
}

function createCustomerDomainOperation() {
  return {
    name: 'customer.create',
    execute(input = {}) {
      if (!input.name) {
        return core.domain.domainFailure(new Error('customer name is required'));
      }

      return core.domain.domainSuccess({
        customerId: 'customer_rc2_c_002',
        name: input.name,
        status: 'domain-created',
      });
    },
  };
}

module.exports = {
  buildDomainOperationFlow,
  createCustomerDomainOperation,
};
