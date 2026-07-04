module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portal_messages', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      firm_id: { type: Sequelize.UUID, allowNull: false },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onDelete: 'CASCADE',
      },
      matter_id: { type: Sequelize.UUID, allowNull: false },
      sender_type: { type: Sequelize.STRING, allowNull: false },
      sender_id: { type: Sequelize.UUID, allowNull: false },
      subject: Sequelize.STRING,
      body: { type: Sequelize.TEXT, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'sent' },
      read_at: Sequelize.DATE,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('portal_messages', ['matter_id']);
    await queryInterface.addIndex('portal_messages', ['client_id']);
    await queryInterface.addIndex('portal_messages', ['status']);
    await queryInterface.addIndex('portal_messages', ['created_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('portal_messages');
  },
};
