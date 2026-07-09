const IdentityService = require('./IdentityService');

function createIdentityService({ users = [] } = {}) {
  return new IdentityService({ users });
}

module.exports = createIdentityService;
