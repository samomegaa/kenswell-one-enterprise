module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      firm_id: Sequelize.UUID,
      user_id: Sequelize.UUID,
      client_id: Sequelize.UUID,

      actor_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      actor_id: Sequelize.UUID,

      event: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      resource_type: Sequelize.STRING,
      resource_id: Sequelize.UUID,

      http_method: Sequelize.STRING,
      request_path: Sequelize.STRING,
      ip_address: Sequelize.STRING,
      user_agent: Sequelize.TEXT,

      metadata: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('audit_logs', ['firm_id']);
    await queryInterface.addIndex('audit_logs', ['user_id']);
    await queryInterface.addIndex('audit_logs', ['client_id']);
    await queryInterface.addIndex('audit_logs', ['actor_type']);
    await queryInterface.addIndex('audit_logs', ['event']);
    await queryInterface.addIndex('audit_logs', ['resource_type', 'resource_id']);
    await queryInterface.addIndex('audit_logs', ['created_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('audit_logs');
  },
};
