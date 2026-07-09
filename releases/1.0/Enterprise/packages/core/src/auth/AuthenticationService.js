class AuthenticationService {
  constructor({ providerRegistry }) {
    if (!providerRegistry) {
      throw new Error('AuthenticationService requires providerRegistry');
    }

    this.providerRegistry = providerRegistry;
  }

  providers() {
    return this.providerRegistry.list();
  }

  enabledProviders() {
    return this.providerRegistry.enabled();
  }

  defaultProvider() {
    return this.providerRegistry.defaultProvider();
  }

  authenticate(credentials = {}, providerId) {
    return this.providerRegistry.authenticate(credentials, providerId);
  }
}

module.exports = AuthenticationService;
