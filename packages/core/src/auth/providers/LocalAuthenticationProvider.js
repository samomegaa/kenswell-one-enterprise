const AuthenticationProvider = require('./AuthenticationProvider');

class LocalAuthenticationProvider extends AuthenticationProvider {
  constructor(options = {}) {
    super({
      id: 'local',
      name: 'Local Authentication',
      enabled: true,
      ...options,
    });
  }

  async authenticate(credentials = {}) {
    const { email, password } = credentials;

    if (!email || !password) {
      return {
        authenticated: false,
        provider: this.id,
        reason: 'missing_credentials',
      };
    }

    return {
      authenticated: true,
      provider: this.id,
      subject: String(email).toLowerCase(),
      claims: {
        email: String(email).toLowerCase(),
      },
    };
  }

  async refresh(session = {}) {
    return {
      refreshed: true,
      provider: this.id,
      session,
    };
  }

  async revoke(session = {}) {
    return {
      revoked: true,
      provider: this.id,
      session,
    };
  }
}

module.exports = LocalAuthenticationProvider;
