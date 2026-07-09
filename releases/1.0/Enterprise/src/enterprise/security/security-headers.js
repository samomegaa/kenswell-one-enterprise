const { SecurityHeaderError } = require('./security-errors');

const DEFAULT_SECURITY_HEADERS = Object.freeze({
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'no-referrer',
  'x-xss-protection': '0',
  'cross-origin-opener-policy': 'same-origin',
  'cross-origin-resource-policy': 'same-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
});

function createSecurityHeaders(overrides = {}) {
  return Object.freeze({
    ...DEFAULT_SECURITY_HEADERS,
    ...overrides,
  });
}

function applySecurityHeaders(res, headers = DEFAULT_SECURITY_HEADERS) {
  if (!res || typeof res.setHeader !== 'function') {
    throw new SecurityHeaderError('valid response object is required');
  }

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  return headers;
}

module.exports = {
  DEFAULT_SECURITY_HEADERS,
  createSecurityHeaders,
  applySecurityHeaders,
};
