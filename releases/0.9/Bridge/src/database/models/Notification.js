module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
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
    clientId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'client_id',
    },
    recipientType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'recipient_type',
    },
    recipientId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'recipient_id',
    },
    recipientEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recipient_email',
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    template: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    providerMessageId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'provider_message_id',
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'error_message',
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'sent_at',
    },
  }, {
    tableName: 'notifications',
    underscored: true,
    timestamps: true,
  });

  return Notification;
};
