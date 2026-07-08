const PluginState = Object.freeze({
  REGISTERED: 'registered',
  LOADED: 'loaded',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  UNLOADED: 'unloaded',
});

const PluginTransition = Object.freeze({
  LOAD: 'load',
  ENABLE: 'enable',
  DISABLE: 'disable',
  UNLOAD: 'unload',
});

module.exports = {
  PluginState,
  PluginTransition,
};
