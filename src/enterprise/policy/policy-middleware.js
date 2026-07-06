const { ValidationBoundary } = require('./validation-boundary');
const { PolicyBoundary } = require('./policy-boundary');

function enterpriseValidationPolicyMiddleware({
  validationBoundary = new ValidationBoundary(),
  policyBoundary = new PolicyBoundary(),
} = {}) {
  return function attachValidationPolicyBoundary(req, res, next) {
    req.validationBoundary = validationBoundary;
    req.policyBoundary = policyBoundary;
    return next();
  };
}

module.exports = {
  enterpriseValidationPolicyMiddleware,
};
