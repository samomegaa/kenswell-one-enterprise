module.exports = (sequelize, DataTypes) => {
  const PortalMessage = sequelize.define('PortalMessage', {
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
    senderType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'sender_type',
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'sender_id',
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sent',
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'read_at',
    },
  }, {
    tableName: 'portal_messages',
    underscored: true,
    timestamps: true,
  });

  PortalMessage.associate = (models) => {
    PortalMessage.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
    });

    PortalMessage.belongsTo(models.PortalMatter, {
      foreignKey: 'matterId',
      as: 'matter',
    });
  };

  return PortalMessage;
};
