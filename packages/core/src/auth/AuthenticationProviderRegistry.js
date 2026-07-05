const fs = require('fs');
const path = require('path');

const AuthenticationProvider = require('./providers/AuthenticationProvider');
const LocalAuthenticationProvider = require('./providers/LocalAuthenticationProvider');

class AuthenticationProviderRegistry {
  constructor({ manifestPath } = {}) {
    this.providers = new Map();
    this.defaultProviderId = null;

    if (manifestPath) {
      this.loadManifest(manifestPath);
    }
  }

  loadManifest(manifestPath = path.join(__dirname, 'providers/providers.json')) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    this.defaultProviderId = manifest.default;

    for (const provider of manifest.providers || []) {
      if (provider.id === 'local') {
        this.register(new LocalAuthenticationProvider(provider));
      } else {
        this.register(new AuthenticationProvider(provider));
      }
    }

    return this;
  }

  register(provider) {
    if (!provider || !provider.id) {
      throw new Error('Authentication provider must include id');
    }

    if (this.providers.has(provider.id)) {
      throw new Error(`Authentication provider already registered: ${provider.id}`);
    }

    this.providers.set(provider.id, provider);

    return provider;
  }

  get(id) {
    return this.providers.get(id) || null;
  }

  list() {
    return Array.from(this.providers.values());
  }

  enabled() {
    return this.list().filter((provider) => provider.enabled === true);
  }

  disabled() {
    return this.list().filter((provider) => provider.enabled !== true);
  }

  defaultProvider() {
    return this.get(this.defaultProviderId);
  }

  async authenticate(credentials = {}, providerId = this.defaultProviderId) {
    const provider = this.get(providerId);

    if (!provider) {
      throw new Error(`Authentication provider not found: ${providerId}`);
    }

    if (!provider.enabled) {
      throw new Error(`Authentication provider is disabled: ${providerId}`);
    }

    return provider.authenticate(credentials);
  }
}

module.exports = AuthenticationProviderRegistry;
