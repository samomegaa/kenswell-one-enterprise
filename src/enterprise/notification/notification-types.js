const NotificationChannel = Object.freeze({
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  WEBHOOK: 'webhook',
  WHATSAPP: 'whatsapp',
});

const NotificationPriority = Object.freeze({
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  CRITICAL: 'critical',
});

const NotificationStatus = Object.freeze({
  CREATED: 'created',
  QUEUED: 'queued',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

module.exports = {
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
};
