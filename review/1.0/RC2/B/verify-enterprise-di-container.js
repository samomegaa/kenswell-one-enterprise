const {
  EnterpriseContainer,
  createEnterpriseContainer,
  ServiceLifetime,
  enterpriseDiMiddleware,
  ServiceRegistrationError,
  ServiceResolutionError,
} = require('../../../../src/enterprise/di');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const container = createEnterpriseContainer();

assert(container instanceof EnterpriseContainer, 'container factory invalid');

container.registerValue('config', {
  env: 'test',
});

container.register('singleton.service', () => {
  return {
    id: Math.random(),
  };
});

container.register('transient.service', () => {
  return {
    id: Math.random(),
  };
}, {
  lifetime: ServiceLifetime.TRANSIENT,
});

const config = container.resolve('config');
assert(config.env === 'test', 'value registration failed');

const singletonA = container.resolve('singleton.service');
const singletonB = container.resolve('singleton.service');

assert(singletonA === singletonB, 'singleton lifetime failed');

const transientA = container.resolve('transient.service');
const transientB = container.resolve('transient.service');

assert(transientA !== transientB, 'transient lifetime failed');

const scope = container.createScope();

scope.registerValue('scoped.value', {
  ok: true,
});

assert(scope.resolve('scoped.value').ok === true, 'scope local resolution failed');
assert(scope.resolve('config') === config, 'scope parent resolution failed');

try {
  container.register('config', () => ({}));
  throw new Error('duplicate registration should fail');
} catch (error) {
  assert(error instanceof ServiceRegistrationError, 'wrong duplicate registration error');
}

try {
  container.resolve('missing.service');
  throw new Error('missing service should fail');
} catch (error) {
  assert(error instanceof ServiceResolutionError, 'wrong missing service error');
}

assert(container.has('config') === true, 'has check failed');
assert(container.list().length === 3, 'registration list count mismatch');

assert(typeof enterpriseDiMiddleware === 'function', 'DI middleware not exported');
assert(core.di, 'di not exported from core');
assert(typeof core.di.createEnterpriseContainer === 'function', 'core DI export invalid');

console.log('✅ Enterprise Dependency Injection Container verification passed');
