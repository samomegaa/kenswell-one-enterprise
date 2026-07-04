module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portal_accounts', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      firm_id: { type: Sequelize.UUID, allowNull: false },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onDelete: 'CASCADE',
      },
      email: { type: Sequelize.STRING, allowNull: false },
      password_hash: Sequelize.STRING,
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'invited' },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'client_owner' },
      invitation_token: Sequelize.STRING,
      invitation_expires_at: Sequelize.DATE,
      last_login_at: Sequelize.DATE,
      failed_login_attempts: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      locked_until: Sequelize.DATE,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('portal_accounts', ['client_id']);
    await queryInterface.addIndex('portal_accounts', ['email']);
    await queryInterface.addIndex('portal_accounts', ['status']);
    await queryInterface.addIndex('portal_accounts', ['invitation_token']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('portal_accounts');
  },
};
