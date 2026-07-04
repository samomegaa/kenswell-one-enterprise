module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual',
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'display_name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  }, {
    tableName: 'clients',
    underscored: true,
    timestamps: true,
  });

  Client.associate = (models) => {
    Client.hasOne(models.PortalAccount, {
      foreignKey: 'clientId',
      as: 'portalAccount',
    });

    Client.hasMany(models.PortalMatter, {
      foreignKey: 'clientId',
      as: 'portalMatters',
    });

    Client.hasMany(models.PortalDocument, {
      foreignKey: 'clientId',
      as: 'portalDocuments',
    });

    Client.hasMany(models.PortalMessage, {
      foreignKey: 'clientId',
      as: 'portalMessages',
    });
  };

  return Client;
};
