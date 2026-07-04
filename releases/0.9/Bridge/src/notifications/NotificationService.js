const {
  notificationRepository,
} = require('../repositories/notifications');

const NullEmailProvider = require('./providers/NullEmailProvider');

const {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_STATUS,
} = require('./notification.constants');

class NotificationService {
  constructor({ emailProvider = new NullEmailProvider() } = {}) {
    this.emailProvider = emailProvider;
  }

  async create(data) {
    return notificationRepository.create({
      firmId: data.firmId || null,
      clientId: data.clientId || null,
      recipientType: data.recipientType,
      recipientId: data.recipientId || null,
      recipientEmail: data.recipientEmail || null,
      channel: data.channel,
      type: data.type,
      subject: data.subject || null,
      body: data.body || null,
      template: data.template || null,
      payload: data.payload || {},
      status: data.status || NOTIFICATION_STATUS.PENDING,
    });
  }

  async queueEmail(data) {
    return this.create({
      ...data,
      channel: NOTIFICATION_CHANNELS.EMAIL,
    });
  }

  async queueInApp(data) {
    return this.create({
      ...data,
      channel: NOTIFICATION_CHANNELS.IN_APP,
    });
  }

  async send(notification) {
    if (!notification) {
      throw new Error('Notification is required');
    }

    if (notification.channel === NOTIFICATION_CHANNELS.EMAIL) {
      try {
        const result = await this.emailProvider.sendEmail(notification);
        return notificationRepository.markSent(notification.id, result);
      } catch (error) {
        return notificationRepository.markFailed(notification.id, error.message);
      }
    }

    return notificationRepository.markSent(notification.id, {
      provider: 'internal',
      providerMessageId: `internal_${notification.id}`,
    });
  }

  async processPending({ limit = 25 } = {}) {
    const pending = await notificationRepository.findPending({
      limit,
      order: [['createdAt', 'ASC']],
    });

    const results = [];

    for (const notification of pending) {
      results.push(await this.send(notification));
    }

    return results;
  }

  async createClientInvitationNotification(invitationPayload) {
    return this.queueEmail({
      firmId: invitationPayload.account.firmId,
      clientId: invitationPayload.account.clientId,
      recipientType: 'client',
      recipientId: invitationPayload.account.id,
      recipientEmail: invitationPayload.account.email,
      type: 'client_invitation',
      subject: invitationPayload.email.subject,
      template: invitationPayload.email.template,
      payload: invitationPayload.email.data,
    });
  }
}

module.exports = NotificationService;
