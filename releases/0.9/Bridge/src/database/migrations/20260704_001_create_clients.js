module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      firm_id: { type: Sequelize.UUID, allowNull: false },
      type: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'individual' },
      display_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: Sequelize.STRING,
      reference: Sequelize.STRING,
      metadata: { type: Sequelize.JSONB, allowNull: false, defaultValue: {} },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('clients', ['firm_id']);
    await queryInterface.addIndex('clients', ['email']);
    await queryInterface.addIndex('clients', ['reference']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clients');
  },
};
