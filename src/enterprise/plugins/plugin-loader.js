const { PluginValidationError } = require('./plugin-errors');

class PluginLoader {
  validate(pluginDefinition) {
    const errors = [];

    if (!pluginDefinition || typeof pluginDefinition !== 'object') {
      errors.push('plugin definition is required');
    }

    if (pluginDefinition && typeof pluginDefinition.name !== 'string') {
      errors.push('plugin name is required');
    }

    if (pluginDefinition && typeof pluginDefinition.version !== 'string') {
      errors.push('plugin version is required');
    }

    if (pluginDefinition && pluginDefinition.initialize && typeof pluginDefinition.initialize !== 'function') {
      errors.push('plugin initialize must be a function');
    }

    if (pluginDefinition && pluginDefinition.enable && typeof pluginDefinition.enable !== 'function') {
      errors.push('plugin enable must be a function');
    }

    if (pluginDefinition && pluginDefinition.disable && typeof pluginDefinition.disable !== 'function') {
      errors.push('plugin disable must be a function');
    }

    if (pluginDefinition && pluginDefinition.unload && typeof pluginDefinition.unload !== 'function') {
      errors.push('plugin unload must be a function');
    }

    if (errors.length > 0) {
      throw new PluginValidationError('plugin validation failed', { errors });
    }

    return Object.freeze({
      ok: true,
      errors: [],
    });
  }

  load(pluginDefinition, context = {}) {
    this.validate(pluginDefinition);

    if (typeof pluginDefinition.initialize === 'function') {
      pluginDefinition.initialize(Object.freeze({ ...context }));
    }

    return Object.freeze({
      name: pluginDefinition.name,
      version: pluginDefinition.version,
      plugin: pluginDefinition,
      loadedAt: new Date().toISOString(),
    });
  }
}

function createPluginLoader() {
  return new PluginLoader();
}

module.exports = {
  PluginLoader,
  createPluginLoader,
};
