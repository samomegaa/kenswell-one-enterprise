const EventBus = require('./EventBus');

function createEventBus(options = {}) {
  return new EventBus(options);
}

module.exports = createEventBus;
