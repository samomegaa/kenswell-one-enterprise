module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client_approvals', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      firm_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      matter_id: Sequelize.UUID,
      document_id: Sequelize.UUID,

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: Sequelize.TEXT,

      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'general',
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },

      requested_by_user_id: Sequelize.UUID,
      decided_by_account_id: Sequelize.UUID,
      decided_at: Sequelize.DATE,
      expires_at: Sequelize.DATE,
      decision_note: Sequelize.TEXT,

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

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('client_approvals', ['firm_id']);
    await queryInterface.addIndex('client_approvals', ['client_id']);
    await queryInterface.addIndex('client_approvals', ['matter_id']);
    await queryInterface.addIndex('client_approvals', ['document_id']);
    await queryInterface.addIndex('client_approvals', ['status']);
    await queryInterface.addIndex('client_approvals', ['type']);
    await queryInterface.addIndex('client_approvals', ['expires_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('client_approvals');
  },
};
