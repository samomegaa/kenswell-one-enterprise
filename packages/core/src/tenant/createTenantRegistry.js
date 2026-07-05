const TenantRegistry = require('./TenantRegistry');

function createTenantRegistry({ tenants = [] } = {}) {
  return new TenantRegistry({ tenants });
}

module.exports = createTenantRegistry;
