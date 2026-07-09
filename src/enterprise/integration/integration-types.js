const IntegrationProtocol = Object.freeze({
  REST: 'rest',
  GRAPHQL: 'graphql',
  SOAP: 'soap',
  WEBHOOK: 'webhook',
  MESSAGE_BUS: 'message_bus',
  GRPC: 'grpc',
});

const IntegrationStatus = Object.freeze({
  REGISTERED: 'registered',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  FAILED: 'failed',
});

module.exports = {
  IntegrationProtocol,
  IntegrationStatus,
};
