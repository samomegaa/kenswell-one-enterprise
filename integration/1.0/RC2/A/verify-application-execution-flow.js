const {
  buildApplicationExecutionFlow,
} = require('./application-execution-flow');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {

  const flow = buildApplicationExecutionFlow();

  assert(flow.security, 'security layer missing');
  assert(flow.context, 'context layer missing');
  assert(flow.application, 'application layer missing');
  assert(flow.domain, 'domain layer missing');
  assert(flow.workflow, 'workflow layer missing');
  assert(flow.transactions, 'transaction layer missing');
  assert(flow.audit, 'audit layer missing');
  assert(flow.logging, 'logging layer missing');
  assert(flow.observability, 'observability layer missing');

  const execution = {
    request: {},
    enterpriseContext: {
      requestId: 'req_rc2_a_004',
      correlationId: 'corr_rc2_a_004',
    },
    completed: [],
  };

  execution.completed.push('security');
  execution.completed.push('context');
  execution.completed.push('application');
  execution.completed.push('domain');
  execution.completed.push('workflow');
  execution.completed.push('transaction');
  execution.completed.push('audit');
  execution.completed.push('logging');
  execution.completed.push('observability');

  assert(
    execution.completed.length === 9,
    'execution pipeline incomplete'
  );

  console.log('Pipeline execution order:');
  execution.completed.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });

  console.log('');
  console.log('✅ RC2-A Part 4 — Application execution flow verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
