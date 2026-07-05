function normaliseError(error) {
  const statusCode = error.statusCode || error.status || 500;

  return {
    statusCode,
    code: error.code || (statusCode === 500 ? 'internal_server_error' : 'request_error'),
    message: statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Unexpected error',
    details: error.details || null,
  };
}

function errorHandler(error, req, res, next) {
  const normalised = normaliseError(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(normalised.statusCode).json({
    success: false,
    error: {
      code: normalised.code,
      message: normalised.message,
      ...(normalised.details ? { details: normalised.details } : {}),
    },
    meta: {
      requestId: req.requestId || null,
    },
  });
}

module.exports = errorHandler;
