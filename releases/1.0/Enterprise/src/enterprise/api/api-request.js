function createApiRequest({
  req = {},
  enterpriseContext = null,
  workflowContext = null,
  transactionBoundary = null,
  applicationServices = null,
  domainServices = null,
  input = {},
  metadata = {},
} = {}) {
  return Object.freeze({
    requestId: enterpriseContext?.requestId || req.headers?.['x-request-id'] || null,
    correlationId: enterpriseContext?.correlationId || req.headers?.['x-correlation-id'] || null,

    method: req.method || metadata.method || null,
    path: req.originalUrl || req.url || metadata.path || null,

    params: req.params || {},
    query: req.query || {},
    body: req.body || {},
    headers: req.headers || {},

    input,

    enterpriseContext,
    workflowContext,
    transactionBoundary,
    applicationServices,
    domainServices,

    metadata,
  });
}

module.exports = {
  createApiRequest,
};
