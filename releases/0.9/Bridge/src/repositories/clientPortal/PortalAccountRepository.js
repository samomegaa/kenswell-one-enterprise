const BaseRepository = require('../BaseRepository');

class PortalAccountRepository extends BaseRepository {
  constructor(models) {
    super(models.PortalAccount);
  }

  findByClientId(clientId, options = {}) {
    return this.findOne({ clientId }, options);
  }

  findByEmail(email, options = {}) {
    return this.findOne({
      email: String(email).toLowerCase(),
    }, options);
  }

  findByInvitationToken(invitationToken, options = {}) {
    return this.findOne({ invitationToken }, options);
  }

  findActiveByEmail(email, options = {}) {
    return this.findOne({
      email: String(email).toLowerCase(),
      status: 'active',
    }, options);
  }

  markLoginSuccess(id, options = {}) {
    return this.update(id, {
      lastLoginAt: new Date(),
      failedLoginAttempts: 0,
      lockedUntil: null,
    }, options);
  }

  incrementFailedLogin(id, currentAttempts = 0, options = {}) {
    return this.update(id, {
      failedLoginAttempts: currentAttempts + 1,
    }, options);
  }

  lockAccount(id, lockedUntil, options = {}) {
    return this.update(id, { lockedUntil }, options);
  }
}

module.exports = PortalAccountRepository;
