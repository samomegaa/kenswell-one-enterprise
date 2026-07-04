module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portal_documents', {
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
      description: Sequelize.TEXT,
      file_key: Sequelize.STRING,
      file_name: Sequelize.STRING,
      mime_type: Sequelize.STRING,
      size_bytes: Sequelize.BIGINT,
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'requested' },
      visibility: { type: Sequelize.STRING, allowNull: false, defaultValue: 'client_visible' },
      uploaded_by_client: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      uploaded_by_user_id: Sequelize.UUID,
      reviewed_by_user_id: Sequelize.UUID,
      reviewed_at: Sequelize.DATE,
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.addIndex('portal_documents', ['matter_id']);
    await queryInterface.addIndex('portal_documents', ['status']);
    await queryInterface.addIndex('portal_documents', ['visibility']);
    await queryInterface.addIndex('portal_documents', ['uploaded_by_client']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('portal_documents');
  },
};
