function allowPolicy(reason = 'allowed', metadata = {}) {
  return Object.freeze({
    allowed: true,
    reason,
    metadata,
  });
}

function denyPolicy(reason = 'denied', metadata = {}) {
  return Object.freeze({
    allowed: false,
    reason,
    metadata,
  });
}

module.exports = {
  allowPolicy,
  denyPolicy,
};
