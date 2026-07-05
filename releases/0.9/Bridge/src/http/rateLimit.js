function getClientKey(req) {
  return req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
}

function rateLimit({
  windowMs = 15 * 60 * 1000,
  max = 100,
  keyGenerator = getClientKey,
  message = 'Too many requests',
} = {}) {
  const hits = new Map();

  return function rateLimitMiddleware(req, res, next) {
    const now = Date.now();
    const key = keyGenerator(req);
    const current = hits.get(key);

    if (!current || current.resetAt <= now) {
      hits.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });

      res.setHeader('RateLimit-Limit', String(max));
      res.setHeader('RateLimit-Remaining', String(max - 1));
      res.setHeader('RateLimit-Reset', String(Math.ceil((now + windowMs) / 1000)));

      return next();
    }

    current.count += 1;

    const remaining = Math.max(max - current.count, 0);

    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(remaining));
    res.setHeader('RateLimit-Reset', String(Math.ceil(current.resetAt / 1000)));

    if (current.count > max) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'rate_limit_exceeded',
          message,
        },
      });
    }

    return next();
  };
}

module.exports = rateLimit;
