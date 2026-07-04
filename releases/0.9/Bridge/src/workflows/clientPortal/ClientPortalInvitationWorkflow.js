const {
  clientPortalService,
  portalAccountService,
} = require('../../services/clientPortal');

const {
  clientPortalAuthService,
} = require('../../auth/clientPortal');

class ClientPortalInvitationWorkflow {
  async inviteExistingClient({
    firmId,
    clientId,
    email,
    role = 'client_owner',
    expiresInHours = 72,
    portalBaseUrl = process.env.CLIENT_PORTAL_BASE_URL || 'https://portal.kenswellone.com',
  }) {
    const client = await clientPortalService.getClientById(clientId);

    if (!client) {
      throw new Error('Client not found');
    }

    const existingAccount = await portalAccountService.findByEmail(email);

    if (existingAccount && existingAccount.status === 'active') {
      throw new Error('Client portal account already active');
    }

    const account = await portalAccountService.inviteClientAccount({
      firmId,
      clientId,
      email,
      role,
      expiresInHours,
    });

    return this.buildInvitationPayload({
      account,
      client,
      portalBaseUrl,
    });
  }

  async inviteNewClient({
    firmId,
    clientData,
    role = 'client_owner',
    expiresInHours = 72,
    portalBaseUrl = process.env.CLIENT_PORTAL_BASE_URL || 'https://portal.kenswellone.com',
  }) {
    const client = await clientPortalService.createClient({
      ...clientData,
      firmId,
    });

    return this.inviteExistingClient({
      firmId,
      clientId: client.id,
      email: client.email,
      role,
      expiresInHours,
      portalBaseUrl,
    });
  }

  async validateInvitation(token) {
    const account = await portalAccountService.findByInvitationToken(token);

    if (!account) {
      return {
        valid: false,
        reason: 'invalid_token',
      };
    }

    if (account.status !== 'invited') {
      return {
        valid: false,
        reason: 'account_not_invited',
        account,
      };
    }

    if (account.invitationExpiresAt && new Date(account.invitationExpiresAt) < new Date()) {
      return {
        valid: false,
        reason: 'expired',
        account,
      };
    }

    return {
      valid: true,
      account,
    };
  }

  async activateInvitation({ token, password }) {
    const validation = await this.validateInvitation(token);

    if (!validation.valid) {
      throw new Error(`Invitation validation failed: ${validation.reason}`);
    }

    return clientPortalAuthService.activateInvitation({
      token,
      password,
    });
  }

  async resendInvitation({
    accountId,
    expiresInHours = 72,
    portalBaseUrl = process.env.CLIENT_PORTAL_BASE_URL || 'https://portal.kenswellone.com',
  }) {
    const existingAccount = await portalAccountService.findById(accountId);

    if (!existingAccount) {
      throw new Error('Portal account not found');
    }

    if (existingAccount.status === 'active') {
      throw new Error('Active accounts cannot be re-invited');
    }

    const account = await portalAccountService.refreshInvitation(accountId, expiresInHours);
    const client = await clientPortalService.getClientById(account.clientId);

    return this.buildInvitationPayload({
      account,
      client,
      portalBaseUrl,
    });
  }

  buildInvitationPayload({ account, client, portalBaseUrl }) {
    const activationUrl = `${portalBaseUrl.replace(/\/$/, '')}/activate?token=${account.invitationToken}`;

    return {
      account,
      client,
      activationUrl,
      email: {
        to: account.email,
        subject: 'Your Kenswell One Client Portal invitation',
        template: 'client_portal_invitation',
        data: {
          clientName: client.displayName,
          activationUrl,
          expiresAt: account.invitationExpiresAt,
        },
      },
    };
  }
}

module.exports = ClientPortalInvitationWorkflow;
