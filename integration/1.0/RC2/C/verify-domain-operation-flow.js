const {
  buildDomainOperationFlow,
  createCustomerDomainOperation,
} = require('./domain-operation-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const flow = buildDomainOperationFlow();

  assert(flow.application, 'application layer missing');
  assert(flow.domain, 'domain layer missing');
  assert(flow.context, 'context layer missing');

  assert(typeof flow.domain.DomainService === 'function', 'DomainService missing');
  assert(typeof flow.domain.DomainOperation === 'function', 'DomainOperation missing');
  assert(typeof flow.domain.domainSuccess === 'function', 'domainSuccess missing');
  assert(typeof flow.domain.domainFailure === 'function', 'domainFailure missing');

  const operation = createCustomerDomainOperation();

  assert(operation.name === 'customer.create', 'operation name mismatch');
  assert(typeof operation.execute === 'function', 'operation execute missing');

  const success = operation.execute({
    name: 'Kenswell Customer',
  });

  assert(success.ok === true, 'domain operation should succeed');
  assert(success.data.customerId === 'customer_rc2_c_002', 'customerId mismatch');
  assert(success.data.status === 'domain-created', 'domain status mismatch');
  assert(Object.isFrozen(success), 'domain success result should be immutable');

  const failure = operation.execute({});

  assert(failure.ok === false, 'domain operation should fail without name');
  assert(failure.error.message === 'customer name is required', 'failure reason mismatch');
  assert(Object.isFrozen(failure), 'domain failure result should be immutable');

  const applicationResult = flow.application.applicationSuccess({
    domainResult: success.data,
  });

  assert(applicationResult.ok === true, 'application wrapper should succeed');
  assert(applicationResult.data.domainResult.customerId === 'customer_rc2_c_002', 'application domain result mismatch');

  console.log('✅ RC2-C Part 2 — Domain operation flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
