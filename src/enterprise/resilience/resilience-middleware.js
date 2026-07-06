const { IdempotencyBoundary } = require('./idempotency-boundary');
const { RetryBoundary } = require('./retry-boundary');

function enterpriseResilienceMiddleware({
  idempotencyBoundary = new IdempotencyBoundary(),
  retryBoundary = new RetryBoundary(),
} = {}) {
  return function attachEnterpriseResilience(req, res, next) {
    req.idempotencyBoundary = idempotencyBoundary;
    req.retryBoundary = retryBoundary;
    return next();
  };
}

module.exports = {
  enterpriseResilienceMiddleware,
};
