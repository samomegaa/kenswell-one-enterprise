module.exports = (sequelize, DataTypes) => {
  const PortalAccount = sequelize.define('PortalAccount', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'password_hash',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'invited',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'client_owner',
    },
    invitationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'invitation_token',
    },
    invitationExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'invitation_expires_at',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_at',
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'failed_login_attempts',
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'locked_until',
    },
  }, {
    tableName: 'portal_accounts',
    underscored: true,
    timestamps: true,
  });

  PortalAccount.associate = (models) => {
    PortalAccount.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client',
    });
  };

  return PortalAccount;
};
