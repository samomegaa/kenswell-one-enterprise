const ModuleLifecycleState = Object.freeze({
  REGISTERED: 'registered',
  INITIALIZED: 'initialized',
  STARTED: 'started',
  STOPPED: 'stopped',
  DISPOSED: 'disposed',
});

const ModuleLifecycleTransition = Object.freeze({
  INITIALIZE: 'initialize',
  START: 'start',
  STOP: 'stop',
  DISPOSE: 'dispose',
});

module.exports = {
  ModuleLifecycleState,
  ModuleLifecycleTransition,
};
