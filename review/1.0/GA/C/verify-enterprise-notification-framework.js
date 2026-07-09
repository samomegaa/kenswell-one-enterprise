const {
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
  EnterpriseNotification,
  NotificationRegistry,
  NotificationProvider,
  createNotificationProvider,
  enterpriseNotificationMiddleware,
  NotificationRegistrationError,
  NotificationNotFoundError,
  NotificationDeliveryError,
} = require('../../../../src/enterprise/notification');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

class EmailNotification extends EnterpriseNotification {
  constructor() {
    super({
      name: 'verification.email',
      channel: NotificationChannel.EMAIL,
      metadata: {
        purpose: 'notification verification',
      },
    });
  }

  async send(context, message) {
    return {
      notificationName: context.notificationName,
      channel: context.channel,
      to: message.to,
      subject: message.subject,
      priority: message.priority,
      ok: true,
    };
  }
}

class FailingNotification extends EnterpriseNotification {
  constructor() {
    super({
      name: 'failing.email',
      channel: NotificationChannel.EMAIL,
    });
  }

  async send() {
    throw new Error('expected notification failure');
  }
}

async function run() {
  const registry = new NotificationRegistry();

  const provider = createNotificationProvider({
    registry,
    scheduler: { name: 'test.scheduler' },
    repositories: { name: 'test.repositories' },
    configuration: { name: 'test.configuration' },
    compositionRoot: { name: 'test.composition' },
  });

  assert(provider instanceof NotificationProvider, 'provider factory invalid');

  const notification = new EmailNotification();
  const registered = provider.register(notification);

  assert(registered.name === 'verification.email', 'notification registration name mismatch');
  assert(registered.channel === NotificationChannel.EMAIL, 'notification channel mismatch');
  assert(registered.status === NotificationStatus.CREATED, 'notification initial status invalid');
  assert(Object.isFrozen(registered), 'notification registration record should be frozen');

  assert(provider.has('verification.email') === true, 'provider has failed');
  assert(provider.get('verification.email').name === 'verification.email', 'provider get failed');
  assert(provider.list().length === 1, 'provider list count mismatch');

  const queued = provider.queue('verification.email');

  assert(queued.status === NotificationStatus.QUEUED, 'notification queue failed');

  const result = await provider.send('verification.email', {
    to: 'test@example.com',
    subject: 'Verification',
    priority: NotificationPriority.HIGH,
  });

  assert(result.ok === true, 'notification send result not ok');
  assert(result.notification === 'verification.email', 'notification result name mismatch');
  assert(result.channel === NotificationChannel.EMAIL, 'notification result channel mismatch');
  assert(result.status === NotificationStatus.SENT, 'notification final status mismatch');
  assert(result.result.to === 'test@example.com', 'notification recipient mismatch');
  assert(result.result.priority === NotificationPriority.HIGH, 'notification priority mismatch');
  assert(Object.isFrozen(result), 'notification result should be frozen');

  try {
    await provider.send('verification.email', {});
    throw new Error('sent notification should not send again');
  } catch (error) {
    assert(error instanceof NotificationDeliveryError, 'wrong sent resend error');
  }

  provider.register(new FailingNotification());

  try {
    await provider.send('failing.email', {});
    throw new Error('failing notification should throw');
  } catch (error) {
    assert(error instanceof NotificationDeliveryError, 'wrong failing notification error');
  }

  assert(provider.get('failing.email').status === NotificationStatus.FAILED, 'failing notification status mismatch');

  try {
    provider.register(new EmailNotification());
    throw new Error('duplicate notification should fail');
  } catch (error) {
    assert(error instanceof NotificationRegistrationError, 'wrong duplicate notification error');
  }

  try {
    provider.get('missing.notification');
    throw new Error('missing notification should fail');
  } catch (error) {
    assert(error instanceof NotificationNotFoundError, 'wrong missing notification error');
  }

  const cancelledNotification = new class extends EnterpriseNotification {
    constructor() {
      super({
        name: 'cancel.email',
        channel: NotificationChannel.EMAIL,
      });
    }

    async send() {
      return true;
    }
  }();

  provider.register(cancelledNotification);
  provider.queue('cancel.email');

  const cancelled = provider.cancel('cancel.email');

  assert(cancelled.status === NotificationStatus.CANCELLED, 'notification cancel failed');

  try {
    await new EnterpriseNotification({
      name: 'base.notification',
      channel: NotificationChannel.EMAIL,
    }).send();

    throw new Error('base notification should fail');
  } catch (error) {
    assert(error instanceof NotificationRegistrationError, 'wrong base notification contract error');
  }

  assert(typeof enterpriseNotificationMiddleware === 'function', 'notification middleware not exported');

  assert(core.notification, 'notification not exported from core');
  assert(typeof core.notification.createNotificationProvider === 'function', 'core notification export invalid');

  console.log('✅ Enterprise Notification Framework verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
