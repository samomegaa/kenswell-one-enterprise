const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'packages/core/src/auth/AuthenticationService.js',
  'packages/core/src/auth/AuthenticationProviderRegistry.js',
  'packages/core/src/auth/createAuthenticationService.js',
  'packages/core/src/auth/index.js',
  'packages/core/src/auth/providers/AuthenticationProvider.js',
  'packages/core/src/auth/providers/LocalAuthenticationProvider.js',
  'packages/core/src/auth/providers/providers.json',
  'review/1.0/B2/AUTHENTICATION-PROVIDER-FRAMEWORK.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing authentication framework file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Authentication framework file is empty: ${file}`);
  }
}

const {
  runtime: {
    createEnterpriseRuntime,
  },
  auth: {
    createAuthenticationService,
    AuthenticationProviderRegistry,
    AuthenticationService,
  },
} = require(path.join(root, 'packages/core/src'));

const service = createAuthenticationService();

if (!(service instanceof AuthenticationService)) {
  throw new Error('AuthenticationService not created');
}

if (!(service.providerRegistry instanceof AuthenticationProviderRegistry)) {
  throw new Error('AuthenticationProviderRegistry not created');
}

if (service.providers().length < 6) {
  throw new Error('Expected at least 6 authentication providers');
}

const local = service.defaultProvider();

if (!local || local.id !== 'local') {
  throw new Error('Default provider should be local');
}

if (service.enabledProviders().length !== 1) {
  throw new Error('Only local provider should be enabled at B2');
}

const runtime = createEnterpriseRuntime();

if (!runtime.authenticationService) {
  throw new Error('Runtime does not expose authenticationService');
}

async function verify() {
  const result = await runtime.authenticate({
    email: 'platform.owner@kenswell.local',
    password: 'example-password',
  });

  if (!result.authenticated) {
    throw new Error('Local authentication did not succeed');
  }

  if (result.provider !== 'local') {
    throw new Error('Authentication did not use local provider');
  }

  const summary = runtime.summary();

  if (summary.authenticationProviders < 6) {
    throw new Error('Runtime summary missing authentication providers');
  }

  console.log('Enterprise authentication provider framework verified');
  console.log(summary);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
