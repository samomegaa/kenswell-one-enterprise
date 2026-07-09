function apiSuccess(data = null, metadata = {}) {
  return Object.freeze({
    ok: true,
    data,
    error: null,
    metadata,
  });
}

function apiFailure(error, metadata = {}) {
  return Object.freeze({
    ok: false,
    data: null,
    error: {
      name: error?.name || 'Error',
      message: error?.message || String(error),
      details: error?.details || {},
    },
    metadata,
  });
}

function sendApiResponse(res, result, statusCode = 200) {
  if (!res || typeof res.status !== 'function' || typeof res.json !== 'function') {
    return result;
  }

  const code = result?.ok === false
    ? result?.error?.statusCode || statusCode >= 400 ? statusCode : 400
    : statusCode;

  return res.status(code).json(result);
}

module.exports = {
  apiSuccess,
  apiFailure,
  sendApiResponse,
};
