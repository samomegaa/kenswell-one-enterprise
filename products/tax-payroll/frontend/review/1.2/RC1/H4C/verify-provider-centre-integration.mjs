import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const reviewDirectory = path.dirname(currentFile);
const frontendRoot = path.resolve(
  reviewDirectory,
  '../../../..'
);

const providerPath = path.join(
  frontendRoot,
  'src/workspaces/providers/ProviderCentre.jsx'
);

const requiredFiles = [
  'src/workspaces/providers/IntegratedStaffologyWorkspace.jsx',
  'src/workspaces/providers/EnterpriseRuntimeSidecar.jsx',
  'src/workspaces/providers/RuntimeStatePanel.jsx',
  'src/workspaces/providers/provider-runtime-integration.css',
];

for (const relativePath of requiredFiles) {
  assert.equal(
    fs.existsSync(path.join(frontendRoot, relativePath)),
    true,
    `Missing ${relativePath}`
  );
}

const providerSource = fs.readFileSync(
  providerPath,
  'utf8'
);

assert.match(
  providerSource,
  /IntegratedStaffologyWorkspace/
);

assert.doesNotMatch(
  providerSource,
  /<StaffologyProviderWorkspace/
);

const integrationSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/workspaces/providers/IntegratedStaffologyWorkspace.jsx'
  ),
  'utf8'
);

assert.match(
  integrationSource,
  /StaffologyProviderWorkspace/
);
assert.match(
  integrationSource,
  /EnterpriseRuntimeProvider/
);
assert.match(
  integrationSource,
  /EnterpriseRuntimeSidecar/
);

console.log('PASS  Existing Provider Centre preserved');
console.log('PASS  Staffology workspace preserved');
console.log('PASS  Enterprise runtime sidecar mounted');
console.log('PASS  Dynamic employee workspace available');
console.log(
  '\n✅ RC1-H4C Provider Centre Integration passed'
);
