const {
  portalAccountService,
} = require('../../services/clientPortal');

const {
  hashPassword,
  verifyPassword,
} = require('./password.util');

const {
  signClientPortalToken,
} = require('./token.util');

const {
  CLIENT_PORTAL_AUTH,
} = require('./auth.constants');

class ClientPortalAuthService {
  async activateInvitation({ token, password }) {
    const account = await portalAccountService.findByInvitationToken(token);

    if (!account) {
      throw new Error('Invalid invitation token');
    }

    if (account.status !== 'invited') {
      throw new Error('Invitation is no longer valid');
    }

    if (account.invitationExpiresAt && new Date(account.invitationExpiresAt) < new Date()) {
      throw new Error('Invitation has expired');
    }

    const passwordHash = await hashPassword(password);

    return portalAccountService.activateAccount(account.id, passwordHash);
  }

  async login({ email, password }) {
    const account = await portalAccountService.findByEmail(email);

    if (!account) {
      throw new Error('Invalid email or password');
    }

    if (account.lockedUntil && new Date(account.lockedUntil) > new Date()) {
      throw new Error('Account is temporarily locked');
    }

    if (account.status !== 'active') {
      throw new Error('Account is not active');
    }

    const validPassword = await verifyPassword(password, account.passwordHash);

    if (!validPassword) {
      await portalAccountService.recordFailedLogin(account);
      throw new Error('Invalid email or password');
    }

    await portalAccountService.recordSuccessfulLogin(account.id);

    const accessToken = signClientPortalToken({
      tokenType: CLIENT_PORTAL_AUTH.TOKEN_TYPE,
      accountId: account.id,
      clientId: account.clientId,
      firmId: account.firmId,
      role: account.role,
      email: account.email,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: CLIENT_PORTAL_AUTH.DEFAULT_SESSION_EXPIRY,
      account: {
        id: account.id,
        clientId: account.clientId,
        firmId: account.firmId,
        email: account.email,
        role: account.role,
        status: account.status,
      },
    };
  }
}

module.exports = ClientPortalAuthService;
