const path = require('path');

const ROOT = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const CHECKS = [
  {
    layer: 'api',
    success: 'apiSuccess',
    failure: 'apiFailure',
  },
  {
    layer: 'application',
    success: 'applicationSuccess',
    failure: 'applicationFailure',
  },
  {
    layer: 'cqrs',
    success: 'cqrsSuccess',
    failure: 'cqrsFailure',
  },
  {
    layer: 'domain',
    success: 'domainSuccess',
    failure: 'domainFailure',
  },
];

for (const check of CHECKS) {
  const exported = require(path.join(ROOT, 'src/enterprise', check.layer));

  assert(
    typeof exported[check.success] === 'function',
    `${check.layer} missing success helper: ${check.success}`
  );

  assert(
    typeof exported[check.failure] === 'function',
    `${check.layer} missing failure helper: ${check.failure}`
  );

  const successResult = exported[check.success]({ ok: true });
  const failureResult = exported[check.failure](new Error('expected failure'));

  assert(Object.isFrozen(successResult), `${check.layer} success result not frozen`);
  assert(Object.isFrozen(failureResult), `${check.layer} failure result not frozen`);

  assert(successResult.ok === true, `${check.layer} success result invalid`);
  assert(failureResult.ok === false, `${check.layer} failure result invalid`);
  assert(failureResult.error.message === 'expected failure', `${check.layer} failure error invalid`);
}

const decisionChecks = [
  {
    layer: 'policy',
    allow: 'allowPolicy',
    deny: 'denyPolicy',
  },
  {
    layer: 'security',
    allow: 'allowSecurity',
    deny: 'denySecurity',
  },
];

for (const check of decisionChecks) {
  const exported = require(path.join(ROOT, 'src/enterprise', check.layer));

  assert(typeof exported[check.allow] === 'function', `${check.layer} missing allow helper`);
  assert(typeof exported[check.deny] === 'function', `${check.layer} missing deny helper`);

  const allowResult = exported[check.allow]('allowed');
  const denyResult = exported[check.deny]('denied');

  assert(Object.isFrozen(allowResult), `${check.layer} allow result not frozen`);
  assert(Object.isFrozen(denyResult), `${check.layer} deny result not frozen`);

  assert(allowResult.allowed === true, `${check.layer} allow result invalid`);
  assert(denyResult.allowed === false, `${check.layer} deny result invalid`);
}

const validation = require(path.join(ROOT, 'src/enterprise/policy'));

const validationSuccess = validation.validationSuccess();
const validationFailure = validation.validationFailure([
  {
    rule: 'example',
    message: 'expected failure',
  },
]);

assert(Object.isFrozen(validationSuccess), 'validationSuccess result not frozen');
assert(Object.isFrozen(validationFailure), 'validationFailure result not frozen');
assert(validationSuccess.ok === true, 'validationSuccess invalid');
assert(validationFailure.ok === false, 'validationFailure invalid');

console.log('Result helper layers checked :', CHECKS.length);
console.log('Decision helper layers checked:', decisionChecks.length);
console.log('Validation helpers checked    : 2');

console.log('✅ RC1-E Part 3 — Result object standards verified');
