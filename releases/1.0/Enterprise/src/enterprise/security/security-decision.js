function allowSecurity(reason = 'allowed', metadata = {}) {
  return Object.freeze({
    allowed: true,
    reason,
    metadata,
  });
}

function denySecurity(reason = 'denied', metadata = {}) {
  return Object.freeze({
    allowed: false,
    reason,
    metadata,
  });
}

module.exports = {
  allowSecurity,
  denySecurity,
};
