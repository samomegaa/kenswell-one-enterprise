const { createApiRequest } = require('./api-request');
const { apiFailure } = require('./api-response');
const { ApplicationServiceExecutionError } = require('./api-errors');

class ApiServiceBoundary {
  constructor({
    applicationServices,
    domainServices = null,
  } = {}) {
    this.applicationServices = applicationServices;
    this.domainServices = domainServices;
  }

  async executeApplicationService({
    req = {},
    serviceName,
    useCaseName,
    input = {},
    context = {},
  } = {}) {
    try {
      if (!this.applicationServices) {
        throw new ApplicationServiceExecutionError(
          serviceName,
          useCaseName,
          new Error('applicationServices registry is required')
        );
      }

      const apiRequest = createApiRequest({
        req,
        enterpriseContext: req.enterpriseContext || context.enterpriseContext,
        workflowContext: req.workflowContext || context.workflowContext,
        transactionBoundary: req.transactionBoundary || context.transactionBoundary,
        applicationServices: this.applicationServices,
        domainServices: this.domainServices || req.domainServices || context.domainServices,
        input,
        metadata: {
          serviceName,
          useCaseName,
        },
      });

      return this.applicationServices.execute(serviceName, useCaseName, {
        enterpriseContext: apiRequest.enterpriseContext,
        workflowContext: apiRequest.workflowContext,
        transactionBoundary: apiRequest.transactionBoundary,
        applicationServices: apiRequest.applicationServices,
        domainServices: apiRequest.domainServices,
        input: apiRequest.input,
        apiRequest,
      });
    } catch (error) {
      return apiFailure(
        new ApplicationServiceExecutionError(serviceName, useCaseName, error),
        {
          serviceName,
          useCaseName,
        }
      );
    }
  }
}

module.exports = {
  ApiServiceBoundary,
};
