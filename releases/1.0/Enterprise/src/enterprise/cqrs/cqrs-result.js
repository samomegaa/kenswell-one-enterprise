function cqrsSuccess(data = null, metadata = {}) {
  return Object.freeze({
    ok: true,
    data,
    error: null,
    metadata,
  });
}

function cqrsFailure(error, metadata = {}) {
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

module.exports = {
  cqrsSuccess,
  cqrsFailure,
};
