module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firmId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'firm_id',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id',
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'client_id',
    },
    actorType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'actor_type',
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'actor_id',
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'resource_type',
    },
    resourceId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'resource_id',
    },
    httpMethod: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'http_method',
    },
    requestPath: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'request_path',
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ip_address',
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_agent',
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  }, {
    tableName: 'audit_logs',
    underscored: true,
    timestamps: true,
    updatedAt: false,
  });

  return AuditLog;
};
