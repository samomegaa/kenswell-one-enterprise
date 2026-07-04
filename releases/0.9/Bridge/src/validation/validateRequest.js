const { ValidationError } = require('../errors/ApiError');

function formatZodErrors(error) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
}

function validateRequest(schema) {
  return function validationMiddleware(req, res, next) {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body || {});
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params || {});
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query || {});
      }

      return next();
    } catch (error) {
      if (error.issues) {
        return next(new ValidationError('Validation failed', formatZodErrors(error)));
      }

      return next(error);
    }
  };
}

module.exports = validateRequest;
