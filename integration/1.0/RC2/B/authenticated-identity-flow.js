const core = require('../../../../packages/core/src');

function buildAuthenticatedIdentityFlow() {
  return Object.freeze({
    auth: core.auth,
    identity: core.identity,
    context: core.context,
  });
}

function createAuthenticatedIdentity({
  userId = 'user_rc2_b_001',
  email = 'rc2b@example.com',
  provider = 'local',
} = {}) {
  return Object.freeze({
    authenticated: true,
    provider,
    identity: {
      userId,
      email,
    },
  });
}

module.exports = {
  buildAuthenticatedIdentityFlow,
  createAuthenticatedIdentity,
};
