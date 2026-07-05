module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_assets', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      firm_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      client_id: Sequelize.UUID,
      matter_id: Sequelize.UUID,
      document_id: Sequelize.UUID,

      storage_provider: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'null_storage',
      },

      storage_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      original_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mime_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      size_bytes: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      checksum: Sequelize.STRING,

      visibility: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'private',
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending_upload',
      },

      uploaded_by_type: Sequelize.STRING,
      uploaded_by_id: Sequelize.UUID,
      uploaded_at: Sequelize.DATE,

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

    await queryInterface.addIndex('file_assets', ['firm_id']);
    await queryInterface.addIndex('file_assets', ['client_id']);
    await queryInterface.addIndex('file_assets', ['matter_id']);
    await queryInterface.addIndex('file_assets', ['document_id']);
    await queryInterface.addIndex('file_assets', ['storage_key']);
    await queryInterface.addIndex('file_assets', ['status']);
    await queryInterface.addIndex('file_assets', ['visibility']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('file_assets');
  },
};
