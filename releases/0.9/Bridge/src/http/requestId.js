const crypto = require('crypto');

function createRequestId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return crypto.randomBytes(16).toString('hex');
}

function requestId(req, res, next) {
  const incoming = req.headers['x-request-id'];
  const id = typeof incoming === 'string' && incoming.trim()
    ? incoming.trim()
    : createRequestId();

  req.requestId = id;
  res.setHeader('X-Request-Id', id);

  return next();
}

module.exports = requestId;
