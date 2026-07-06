const {
  createSecurityHeaders,
  applySecurityHeaders,
} = require('./security-headers');

const { RuntimeGuard } = require('./runtime-guard');
const { RequestGuard } = require('./request-guard');
const { RequestGuardError, RuntimeGuardError } = require('./security-errors');

function enterpriseSecurityMiddleware({
  headers = createSecurityHeaders(),
  runtimeGuard = new RuntimeGuard(),
  requestGuard = new RequestGuard(),
} = {}) {
  return async function attachEnterpriseSecurity(req, res, next) {
    try {
      applySecurityHeaders(res, headers);

      const runtimeDecision = await runtimeGuard.evaluate({
        enterpriseContext: req.enterpriseContext || null,
        runtime: req.enterpriseContext?.runtime || null,
      });

      if (!runtimeDecision.allowed) {
        return next(new RuntimeGuardError(runtimeDecision.reason, runtimeDecision.metadata));
      }

      const requestDecision = await requestGuard.evaluate(req);

      if (!requestDecision.allowed) {
        return next(new RequestGuardError(requestDecision.reason, requestDecision.metadata));
      }

      req.security = Object.freeze({
        headers,
        runtimeDecision,
        requestDecision,
      });

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = {
  enterpriseSecurityMiddleware,
};
