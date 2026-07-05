const fs = require('fs');
const path = require('path');

const FeatureFlags = require('./FeatureFlags');

function createFeatureFlags(
  manifestPath = path.join(__dirname, 'features.json')
) {

  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf8')
  );

  return new FeatureFlags(manifest.features);

}

module.exports = createFeatureFlags;
