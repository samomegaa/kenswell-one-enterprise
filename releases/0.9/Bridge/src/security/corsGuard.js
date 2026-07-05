function parseOrigins(value = '') {
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsGuard(options = {}) {
  const allowedOrigins = options.allowedOrigins || parseOrigins(process.env.CLIENT_PORTAL_ALLOWED_ORIGINS || '');

  return function corsGuardMiddleware(req, res, next) {
    const origin = req.headers.origin;

    if (!origin) {
      return next();
    }

    if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

      if (req.method === 'OPTIONS') {
        return res.status(204).end();
      }

      return next();
    }

    return res.status(403).json({
      success: false,
      error: {
        code: 'cors_forbidden',
        message: 'Origin is not allowed',
      },
    });
  };
}

module.exports = corsGuard;
