module.exports = (sequelize, DataTypes) => {
  const FileAsset = sequelize.define('FileAsset', {
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
      allowNull: true,
      field: 'client_id',
    },
    matterId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'matter_id',
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'document_id',
    },
    storageProvider: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'storage_provider',
      defaultValue: 'null_storage',
    },
    storageKey: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'storage_key',
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'original_name',
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mime_type',
    },
    sizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'size_bytes',
    },
    checksum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'private',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending_upload',
    },
    uploadedByType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'uploaded_by_type',
    },
    uploadedById: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'uploaded_by_id',
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'uploaded_at',
    },
  }, {
    tableName: 'file_assets',
    underscored: true,
    timestamps: true,
  });

  return FileAsset;
};
