module.exports = (sequelize, DataTypes) => {
  const PortalDocument = sequelize.define('PortalDocument', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firmId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'firm_id',
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'client_id',
    },
    matterId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'matter_id',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileKey: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_key',
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_name',
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'mime_type',
    },
    sizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'size_bytes',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'requested',
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client_visible',
    },
    uploadedByClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'uploaded_by_client',
    },
    uploadedByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'uploaded_by_user_id',
    },
    reviewedByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'reviewed_by_user_id',
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reviewed_at',
    },
  }, {
    tableName: 'portal_documents',
    underscored: true,
    timestamps: true,
  });

  PortalDocument.associate = (models) => {
    PortalDocument.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
    });

    PortalDocument.belongsTo(models.PortalMatter, {
      foreignKey: 'matterId',
      as: 'matter',
    });
  };

  return PortalDocument;
};
