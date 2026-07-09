const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');

const required = [
  'packages/core/src/events/EventBus.js',
  'packages/core/src/events/createEventBus.js',
  'packages/core/src/events/event.constants.js',
  'packages/core/src/events/index.js',
  'review/1.0/A4/ENTERPRISE-EVENT-BUS.md',
];

for (const file of required) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    throw new Error(`Missing Enterprise Event Bus file: ${file}`);
  }

  if (!fs.readFileSync(full, 'utf8').trim()) {
    throw new Error(`Enterprise Event Bus file is empty: ${file}`);
  }
}

const {
  events: {
    EventBus,
    createEventBus,
    ENTERPRISE_EVENTS,
  },
} = require(path.join(root, 'packages/core/src'));

if (typeof EventBus !== 'function') {
  throw new Error('EventBus export missing');
}

if (typeof createEventBus !== 'function') {
  throw new Error('createEventBus export missing');
}

if (!ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED) {
  throw new Error('Enterprise event constants missing Bridge document event');
}

async function verify() {
  const bus = createEventBus();

  let received = null;

  const unsubscribe = bus.subscribe(
    ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED,
    async (event) => {
      received = event;
    }
  );

  if (bus.subscriberCount(ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED) !== 1) {
    throw new Error('Subscriber was not registered');
  }

  const published = await bus.publish(
    ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED,
    { documentId: 'doc_001' },
    {
      source: 'bridge',
      correlationId: 'corr_001',
      tenantId: 'tenant_001',
      actorId: 'user_001',
    }
  );

  if (!received) {
    throw new Error('Subscriber did not receive event');
  }

  if (received.name !== ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED) {
    throw new Error('Subscriber received incorrect event');
  }

  if (published.payload.documentId !== 'doc_001') {
    throw new Error('Published payload was not preserved');
  }

  if (published.metadata.source !== 'bridge') {
    throw new Error('Published metadata source was not preserved');
  }

  if (bus.eventHistory().length !== 1) {
    throw new Error('Event history was not recorded');
  }

  unsubscribe();

  if (bus.subscriberCount(ENTERPRISE_EVENTS.BRIDGE_DOCUMENT_UPLOADED) !== 0) {
    throw new Error('Subscriber was not removed');
  }

  console.log('Enterprise Event Bus verified');
  console.log(`Events recorded: ${bus.eventHistory().length}`);
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
