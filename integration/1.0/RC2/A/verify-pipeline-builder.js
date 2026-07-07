const { EnterprisePipeline } = require('./pipeline-builder');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const pipeline = new EnterprisePipeline('rc2.request.pipeline');

  pipeline
    .use('security', async () => {
      return {
        securityPassed: true,
      };
    })
    .use('context', async (context) => {
      return {
        contextCreated: context.securityPassed === true,
      };
    })
    .use('response', async (context) => {
      return {
        responseReady: context.contextCreated === true,
      };
    });

  assert(pipeline.listSteps().length === 3, 'pipeline step count mismatch');

  const result = await pipeline.execute({
    requestId: 'req_rc2_a_001',
  });

  assert(result.ok === true, 'pipeline execution failed');
  assert(result.steps.length === 3, 'pipeline executed wrong number of steps');
  assert(result.context.securityPassed === true, 'security step did not pass');
  assert(result.context.contextCreated === true, 'context step did not pass');
  assert(result.context.responseReady === true, 'response step did not pass');
  assert(Object.isFrozen(result), 'pipeline result should be immutable');

  console.log('✅ RC2-A Part 1 — Pipeline builder verified');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
