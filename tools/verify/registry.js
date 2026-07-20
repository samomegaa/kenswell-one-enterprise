'use strict';

const staffologyCatalogue = require(
  './modules/staffology-catalogue'
);

const staffologyWorkspace = require(
  './modules/staffology-workspace'
);

const modules = Object.freeze({
  'staffology-catalogue':
    staffologyCatalogue,

  'staffology-workspace':
    staffologyWorkspace,
});

function resolveModules(names = []) {
  if (!names.length) {
    return Object.entries(modules);
  }

  return names.map((name) => {
    const verifier = modules[name];

    if (!verifier) {
      throw new Error(
        `Unknown verification module: ${name}`
      );
    }

    return [name, verifier];
  });
}

module.exports = Object.freeze({
  modules,
  resolveModules,
});
