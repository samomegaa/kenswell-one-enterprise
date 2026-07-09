const {
  AiCapability,
  AiProviderStatus,
  AiRequestType,
  EnterpriseAiProvider,
  AiProviderRegistry,
  EnterpriseAiService,
  createEnterpriseAiService,
  enterpriseAiMiddleware,
  AiProviderRegistrationError,
  AiProviderNotFoundError,
  AiExecutionError,
} = require('../../../../src/enterprise/ai');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

class VerificationAiProvider extends EnterpriseAiProvider {
  constructor() {
    super({
      name: 'verification.ai',
      capabilities: [
        AiCapability.TEXT_GENERATION,
        AiCapability.REASONING,
        AiCapability.EMBEDDING,
      ],
    });
  }

  async execute(context, request) {
    return {
      ok: true,
      providerName: context.providerName,
      type: request.type,
      capability: request.capability,
      input: request.input,
    };
  }
}

class FailingAiProvider extends EnterpriseAiProvider {
  constructor() {
    super({
      name: 'failing.ai',
      capabilities: [AiCapability.TEXT_GENERATION],
    });
  }

  async execute() {
    throw new Error('expected AI failure');
  }
}

async function run() {
  const registry = new AiProviderRegistry();

  const service = createEnterpriseAiService({
    registry,
    repositories: { name: 'repositories' },
    scheduler: { name: 'scheduler' },
    notifications: { name: 'notifications' },
    search: { name: 'search' },
    integrations: { name: 'integrations' },
    configuration: { name: 'configuration' },
    compositionRoot: { name: 'composition' },
  });

  assert(service instanceof EnterpriseAiService, 'AI service factory invalid');

  service.register(new VerificationAiProvider());
  service.makeAvailable('verification.ai');

  assert(service.has('verification.ai'), 'AI provider not registered');
  assert(service.get('verification.ai').status === AiProviderStatus.AVAILABLE, 'AI provider not available');
  assert(service.findByCapability(AiCapability.REASONING).length === 1, 'capability discovery failed');

  const generated = await service.generate({ prompt: 'Kenswell One' });

  assert(generated.ok === true, 'generate failed');
  assert(generated.type === AiRequestType.GENERATE, 'generate type mismatch');
  assert(generated.capability === AiCapability.TEXT_GENERATION, 'generate capability mismatch');
  assert(generated.provider === 'verification.ai', 'generate provider mismatch');
  assert(Object.isFrozen(generated), 'generate result must be frozen');

  const reasoned = await service.reason({ objective: 'Assess readiness' });

  assert(reasoned.ok === true, 'reason failed');
  assert(reasoned.capability === AiCapability.REASONING, 'reason capability mismatch');

  const embedded = await service.embed({ text: 'Enterprise Intelligence' });

  assert(embedded.ok === true, 'embed failed');
  assert(embedded.capability === AiCapability.EMBEDDING, 'embed capability mismatch');

  try {
    service.register(new VerificationAiProvider());
    throw new Error('duplicate provider should fail');
  } catch (error) {
    assert(error instanceof AiProviderRegistrationError, 'wrong duplicate provider error');
  }

  try {
    service.get('missing.ai');
    throw new Error('missing provider should fail');
  } catch (error) {
    assert(error instanceof AiProviderNotFoundError, 'wrong missing provider error');
  }

  try {
    await service.execute({
      type: 'invalid',
      capability: AiCapability.TEXT_GENERATION,
      input: {},
    });
    throw new Error('invalid request should fail');
  } catch (error) {
    assert(error instanceof AiExecutionError, 'wrong invalid request error');
  }

  service.register(new FailingAiProvider());
  service.makeAvailable('failing.ai');

  try {
    await service.generate({ prompt: 'fail' }, { provider: 'failing.ai' });
    throw new Error('failing provider should fail');
  } catch (error) {
    assert(error instanceof AiExecutionError, 'wrong failing provider error');
  }

  assert(service.get('failing.ai').status === AiProviderStatus.FAILED, 'failing provider status mismatch');

  try {
    await new EnterpriseAiProvider({
      name: 'base.ai',
      capabilities: [AiCapability.TEXT_GENERATION],
    }).execute();
    throw new Error('base provider should fail');
  } catch (error) {
    assert(error instanceof AiProviderRegistrationError, 'wrong base provider error');
  }

  assert(typeof enterpriseAiMiddleware === 'function', 'AI middleware not exported');
  assert(core.ai, 'AI not exported from core');
  assert(typeof core.ai.createEnterpriseAiService === 'function', 'core AI export invalid');

  console.log('✅ Enterprise Intelligence Engine verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
