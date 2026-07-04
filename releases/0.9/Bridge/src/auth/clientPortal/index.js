const ClientPortalAuthService = require('./ClientPortalAuthService');

module.exports = {
  clientPortalAuthService: new ClientPortalAuthService(),
  ...require('./auth.constants'),
  ...require('./password.util'),
  ...require('./token.util'),
};
