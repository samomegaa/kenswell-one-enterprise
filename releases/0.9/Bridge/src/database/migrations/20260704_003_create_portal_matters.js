module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portal_matters', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      firm_id: { type: Sequelize.UUID, allowNull: false },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onDelete: 'CASCADE',
      },
      matter_id: { type: Sequelize.UUID, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      reference: Sequelize.STRING,
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'open' },
      summary: Sequelize.TEXT,
      assigned_user_id: Sequelize.UUID,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('portal_matters', ['firm_id']);
    await queryInterface.addIndex('portal_matters', ['client_id']);
    await queryInterface.addIndex('portal_matters', ['matter_id']);
    await queryInterface.addIndex('portal_matters', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('portal_matters');
  },
};
