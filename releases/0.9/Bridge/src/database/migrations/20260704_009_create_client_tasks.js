module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client_tasks', {
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
        defaultValue: 'open',
      },

      priority: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'normal',
      },

      due_at: Sequelize.DATE,
      assigned_by_user_id: Sequelize.UUID,
      completed_by_account_id: Sequelize.UUID,
      completed_at: Sequelize.DATE,

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

    await queryInterface.addIndex('client_tasks', ['firm_id']);
    await queryInterface.addIndex('client_tasks', ['client_id']);
    await queryInterface.addIndex('client_tasks', ['matter_id']);
    await queryInterface.addIndex('client_tasks', ['status']);
    await queryInterface.addIndex('client_tasks', ['priority']);
    await queryInterface.addIndex('client_tasks', ['due_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('client_tasks');
  },
};
