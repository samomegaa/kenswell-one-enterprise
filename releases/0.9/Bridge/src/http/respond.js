function success(res, data = null, meta = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
  });
}

function created(res, data = null, meta = {}) {
  return success(res, data, meta, 201);
}

function failure(res, error, statusCode = 400, code = 'bad_request', details = null) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: error instanceof Error ? error.message : String(error),
      ...(details ? { details } : {}),
    },
  });
}

module.exports = {
  success,
  created,
  failure,
};
