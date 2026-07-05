const path = require('path');

const AuthenticationService = require('./AuthenticationService');
const AuthenticationProviderRegistry = require('./AuthenticationProviderRegistry');

function createAuthenticationService({ manifestPath } = {}) {
  const registry = new AuthenticationProviderRegistry();

  registry.loadManifest(
    manifestPath || path.join(__dirname, 'providers/providers.json')
  );

  return new AuthenticationService({
    providerRegistry: registry,
  });
}

module.exports = createAuthenticationService;
