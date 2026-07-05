const fs = require('fs');
const path = require('path');

const ModuleRegistry = require('./ModuleRegistry');

function createModuleRegistry({ manifestPath } = {}) {
  const resolvedManifestPath = manifestPath || path.join(__dirname, 'modules.json');

  if (!fs.existsSync(resolvedManifestPath)) {
    throw new Error(`Module manifest not found: ${resolvedManifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(resolvedManifestPath, 'utf8'));

  if (!Array.isArray(manifest.modules)) {
    throw new Error('Module manifest must include a modules array');
  }

  return new ModuleRegistry({
    modules: manifest.modules,
  });
}

module.exports = createModuleRegistry;
