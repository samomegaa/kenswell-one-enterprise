class AuthenticationProvider {
  constructor({ id, name, enabled = false } = {}) {
    if (!id) {
      throw new Error('Authentication provider id is required');
    }

    this.id = id;
    this.name = name || id;
    this.enabled = enabled;
  }

  async authenticate() {
    throw new Error('authenticate() must be implemented by provider');
  }

  async refresh() {
    throw new Error('refresh() must be implemented by provider');
  }

  async revoke() {
    throw new Error('revoke() must be implemented by provider');
  }
}

module.exports = AuthenticationProvider;
