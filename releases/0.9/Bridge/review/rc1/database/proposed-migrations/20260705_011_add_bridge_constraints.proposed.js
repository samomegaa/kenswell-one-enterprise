/**
 * Proposed migration only.
 *
 * Do not run in production until existing data has been checked for orphan records.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('portal_accounts', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_portal_accounts_client_id',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('portal_matters', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_portal_matters_client_id',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('portal_documents', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_portal_documents_client_id',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('portal_documents', {
      fields: ['matter_id'],
      type: 'foreign key',
      name: 'fk_portal_documents_matter_id',
      references: {
        table: 'portal_matters',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('portal_messages', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_portal_messages_client_id',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('portal_messages', {
      fields: ['matter_id'],
      type: 'foreign key',
      name: 'fk_portal_messages_matter_id',
      references: {
        table: 'portal_matters',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('file_assets', {
      fields: ['storage_key'],
      type: 'unique',
      name: 'uq_file_assets_storage_key',
    });

    await queryInterface.addConstraint('portal_accounts', {
      fields: ['email'],
      type: 'unique',
      name: 'uq_portal_accounts_email',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('portal_accounts', 'uq_portal_accounts_email');
    await queryInterface.removeConstraint('file_assets', 'uq_file_assets_storage_key');
    await queryInterface.removeConstraint('portal_messages', 'fk_portal_messages_matter_id');
    await queryInterface.removeConstraint('portal_messages', 'fk_portal_messages_client_id');
    await queryInterface.removeConstraint('portal_documents', 'fk_portal_documents_matter_id');
    await queryInterface.removeConstraint('portal_documents', 'fk_portal_documents_client_id');
    await queryInterface.removeConstraint('portal_matters', 'fk_portal_matters_client_id');
    await queryInterface.removeConstraint('portal_accounts', 'fk_portal_accounts_client_id');
  },
};
