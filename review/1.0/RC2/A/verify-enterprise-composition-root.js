const {
  createEnterpriseCompositionRoot,
  CompositionRegistry,
  enterpriseCompositionMiddleware,
} = require('../../../../src/enterprise/composition');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const registry = new CompositionRegistry();

const root = createEnterpriseCompositionRoot({
  name: 'kenswell.enterprise.rc2',
  version: '1.0-RC2-A',
  registry,
  metadata: {
    release: 'RC2-A',
  },
});

assert(Object.isFrozen(root), 'composition root must be immutable');
assert(root.name === 'kenswell.enterprise.rc2', 'composition root name mismatch');
assert(root.version === '1.0-RC2-A', 'composition root version mismatch');

assert(root.has('kernel'), 'kernel service missing');
assert(root.has('runtime'), 'runtime service missing');
assert(root.has('context'), 'context service missing');
assert(root.has('audit'), 'audit service missing');
assert(root.has('workflow'), 'workflow service missing');
assert(root.has('transactions'), 'transactions service missing');
assert(root.has('domain'), 'domain service missing');
assert(root.has('application'), 'application service missing');
assert(root.has('api'), 'api service missing');
assert(root.has('policy'), 'policy service missing');
assert(root.has('cqrs'), 'cqrs service missing');
assert(root.has('resilience'), 'resilience service missing');
assert(root.has('observability'), 'observability service missing');
assert(root.has('logging'), 'logging service missing');
assert(root.has('security'), 'security service missing');

assert(root.get('kernel') === core, 'kernel service mismatch');
assert(root.get('security') === core.security, 'security service mismatch');

assert(root.listServices().length === 15, 'composition service count mismatch');

assert(typeof enterpriseCompositionMiddleware === 'function', 'composition middleware not exported');
assert(core.composition, 'composition not exported from core');
assert(typeof core.composition.createEnterpriseCompositionRoot === 'function', 'core composition export invalid');

console.log('✅ Enterprise Composition Root verification passed');
