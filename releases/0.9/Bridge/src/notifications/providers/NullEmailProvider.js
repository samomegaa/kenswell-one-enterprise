class NullEmailProvider {
  constructor() {
    this.name = 'null_email_provider';
  }

  async sendEmail(notification) {
    return {
      provider: this.name,
      providerMessageId: `null_${notification.id || Date.now()}`,
      accepted: true,
    };
  }
}

module.exports = NullEmailProvider;
