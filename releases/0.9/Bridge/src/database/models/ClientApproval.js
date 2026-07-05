module.exports = (sequelize, DataTypes) => {
  const ClientApproval = sequelize.define('ClientApproval', {
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
      allowNull: true,
      field: 'matter_id',
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'document_id',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'general',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    requestedByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'requested_by_user_id',
    },
    decidedByAccountId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'decided_by_account_id',
    },
    decidedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'decided_at',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at',
    },
    decisionNote: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'decision_note',
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  }, {
    tableName: 'client_approvals',
    underscored: true,
    timestamps: true,
  });

  return ClientApproval;
};
