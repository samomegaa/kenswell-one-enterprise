module.exports = (sequelize, DataTypes) => {
  const PortalMatter = sequelize.define('PortalMatter', {
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
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open',
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignedUserId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'assigned_user_id',
    },
  }, {
    tableName: 'portal_matters',
    underscored: true,
    timestamps: true,
  });

  PortalMatter.associate = (models) => {
    PortalMatter.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
    });

    PortalMatter.hasMany(models.PortalDocument, {
      foreignKey: 'matterId',
      as: 'documents',
    });

    PortalMatter.hasMany(models.PortalMessage, {
      foreignKey: 'matterId',
      as: 'messages',
    });
  };

  return PortalMatter;
};
