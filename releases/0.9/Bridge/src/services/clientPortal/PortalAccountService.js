const crypto = require('crypto');
const {
  portalAccountRepository,
} = require('../../repositories/clientPortal');

class PortalAccountService {
  async inviteClientAccount({
    firmId,
    clientId,
    email,
    role = 'client_owner',
    expiresInHours = 72,
  }) {
    const invitationToken = crypto.randomBytes(32).toString('hex');
    const invitationExpiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    return portalAccountRepository.create({
      firmId,
      clientId,
      email: String(email).toLowerCase(),
      role,
      status: 'invited',
      invitationToken,
      invitationExpiresAt,
    });
  }

  async findByEmail(email) {
    return portalAccountRepository.findByEmail(email);
  }

  async findByInvitationToken(token) {
    return portalAccountRepository.findByInvitationToken(token);
  }

  async activateAccount(accountId, passwordHash) {
    return portalAccountRepository.update(accountId, {
      passwordHash,
      status: 'active',
      invitationToken: null,
      invitationExpiresAt: null,
    });
  }

  async recordSuccessfulLogin(accountId) {
    return portalAccountRepository.markLoginSuccess(accountId);
  }

  async recordFailedLogin(account) {
    const attempts = Number(account.failedLoginAttempts || 0) + 1;

    if (attempts >= 5) {
      const lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      return portalAccountRepository.update(account.id, {
        failedLoginAttempts: attempts,
        lockedUntil,
      });
    }

    return portalAccountRepository.incrementFailedLogin(account.id, account.failedLoginAttempts || 0);
  }
}

module.exports = PortalAccountService;
