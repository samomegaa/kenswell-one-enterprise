const EnterpriseRuntime = require('./EnterpriseRuntime');

const {
  createModuleRegistry,
} = require('../module-registry');

const {
  createFeatureFlags,
} = require('../feature-flags');

const {
  createEventBus,
} = require('../events');

const {
  createTenantRegistry,
} = require('../tenant');

const {
  createOrganisationRegistry,
} = require('../organisation');

const {
  createIdentityService,
  ENTERPRISE_ROLES,
} = require('../identity');

function createEnterpriseRuntime({
  config = {},
  logger = null,
} = {}) {
  const tenants = config.tenants || [
    {
      id: 'tenant_kenswell',
      name: 'Kenswell',
      status: 'active',
    },
  ];

  const organisations = config.organisations || [
    {
      id: 'org_kenswell_main',
      tenantId: 'tenant_kenswell',
      name: 'Kenswell Main Organisation',
      status: 'active',
    },
  ];

  const users = config.users || [
    {
      id: 'user_platform_owner',
      tenantId: 'tenant_kenswell',
      organisationIds: ['org_kenswell_main'],
      email: 'platform.owner@kenswell.local',
      name: 'Platform Owner',
      roles: [ENTERPRISE_ROLES.OWNER],
    },
  ];

  return new EnterpriseRuntime({
    config,

    registry: createModuleRegistry(),

    featureFlags: createFeatureFlags(),

    eventBus: createEventBus({
      logger,
    }),

    tenantRegistry: createTenantRegistry({
      tenants,
    }),

    organisationRegistry: createOrganisationRegistry({
      organisations,
    }),

    identityService: createIdentityService({
      users,
    }),
  });
}

module.exports = createEnterpriseRuntime;
