const AiCapability = Object.freeze({
  TEXT_GENERATION: 'text_generation',
  REASONING: 'reasoning',
  EMBEDDING: 'embedding',
  CLASSIFICATION: 'classification',
  SUMMARISATION: 'summarisation',
  EXTRACTION: 'extraction',
  VISION: 'vision',
  SPEECH: 'speech',
  AGENT: 'agent',
});

const AiProviderStatus = Object.freeze({
  REGISTERED: 'registered',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  FAILED: 'failed',
});

const AiRequestType = Object.freeze({
  GENERATE: 'generate',
  REASON: 'reason',
  EMBED: 'embed',
  CLASSIFY: 'classify',
  SUMMARISE: 'summarise',
  EXTRACT: 'extract',
});

module.exports = {
  AiCapability,
  AiProviderStatus,
  AiRequestType,
};
