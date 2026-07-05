const IDENTITY_STATUS = {
  ACTIVE: 'active',
  INVITED: 'invited',
  SUSPENDED: 'suspended',
  DISABLED: 'disabled',
};

const IDENTITY_TYPES = {
  USER: 'user',
  SERVICE_ACCOUNT: 'service_account',
};

const ENTERPRISE_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CLIENT: 'client',
};

module.exports = {
  IDENTITY_STATUS,
  IDENTITY_TYPES,
  ENTERPRISE_ROLES,
};
