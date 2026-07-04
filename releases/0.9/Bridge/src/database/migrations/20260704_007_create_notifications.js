module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      firm_id: Sequelize.UUID,
      client_id: Sequelize.UUID,

      recipient_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      recipient_id: Sequelize.UUID,
      recipient_email: Sequelize.STRING,

      channel: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      subject: Sequelize.STRING,
      body: Sequelize.TEXT,
      template: Sequelize.STRING,

      payload: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },

      provider: Sequelize.STRING,
      provider_message_id: Sequelize.STRING,
      error_message: Sequelize.TEXT,
      sent_at: Sequelize.DATE,

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('notifications', ['firm_id']);
    await queryInterface.addIndex('notifications', ['client_id']);
    await queryInterface.addIndex('notifications', ['recipient_type', 'recipient_id']);
    await queryInterface.addIndex('notifications', ['recipient_email']);
    await queryInterface.addIndex('notifications', ['channel']);
    await queryInterface.addIndex('notifications', ['type']);
    await queryInterface.addIndex('notifications', ['status']);
    await queryInterface.addIndex('notifications', ['created_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('notifications');
  },
};
