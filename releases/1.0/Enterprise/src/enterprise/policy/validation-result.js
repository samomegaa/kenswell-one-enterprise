function validationSuccess(metadata = {}) {
  return Object.freeze({
    ok: true,
    errors: [],
    metadata,
  });
}

function validationFailure(errors = [], metadata = {}) {
  return Object.freeze({
    ok: false,
    errors: Array.isArray(errors) ? errors : [errors],
    metadata,
  });
}

module.exports = {
  validationSuccess,
  validationFailure,
};
