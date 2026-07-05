module.exports = (sequelize, DataTypes) => {
  const ClientTask = sequelize.define('ClientTask', {
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
      defaultValue: 'open',
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'normal',
    },
    dueAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_at',
    },
    assignedByUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'assigned_by_user_id',
    },
    completedByAccountId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'completed_by_account_id',
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at',
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  }, {
    tableName: 'client_tasks',
    underscored: true,
    timestamps: true,
  });

  return ClientTask;
};
