const { ApiError } = require('../errors/ApiError');

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const isApiError = error instanceof ApiError;

  const statusCode = isApiError ? error.statusCode : 500;

  const payload = {
    error: {
      message: isApiError ? error.message : 'Internal server error',
      code: isApiError ? error.code : 'internal_error',
    },
  };

  if (isApiError && error.details) {
    payload.error.details = error.details;
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.error.debug = {
      name: error.name,
      stack: error.stack,
    };
  }

  return res.status(statusCode).json(payload);
}

module.exports = errorHandler;
