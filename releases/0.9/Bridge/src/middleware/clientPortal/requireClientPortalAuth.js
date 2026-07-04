const {
  verifyClientPortalToken,
} = require('../../auth/clientPortal/token.util');

function requireClientPortalAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        error: 'Client portal authentication required',
      });
    }

    const payload = verifyClientPortalToken(token);

    if (payload.tokenType !== 'client_portal') {
      return res.status(401).json({
        error: 'Invalid client portal token',
      });
    }

    req.clientPortal = {
      accountId: payload.accountId,
      clientId: payload.clientId,
      firmId: payload.firmId,
      role: payload.role,
      email: payload.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired client portal session',
    });
  }
}

module.exports = requireClientPortalAuth;
