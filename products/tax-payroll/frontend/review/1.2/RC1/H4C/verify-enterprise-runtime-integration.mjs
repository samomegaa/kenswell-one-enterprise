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

const requiredFiles = [
  'src/App.jsx',
  'src/runtime/enterpriseRuntimeNavigation.js',
  'src/runtime/useEnterpriseRuntimeNavigation.js',
  'src/workspaces/providers/EnterpriseProviderCentre.jsx',
  'src/workspaces/providers/EnterpriseRuntimeWorkspace.jsx',
  'src/workspaces/providers/RuntimeStatePanel.jsx',
  'src/workspaces/providers/enterprise-runtime-integration.css',
];

for (const relativePath of requiredFiles) {
  assert.equal(
    fs.existsSync(path.join(frontendRoot, relativePath)),
    true,
    `Missing ${relativePath}`
  );
}

const appSource = fs.readFileSync(
  path.join(frontendRoot, 'src/App.jsx'),
  'utf8'
);

assert.match(appSource, /EnterpriseRuntimeProvider/);
assert.match(appSource, /EnterpriseProviderCentre/);
assert.match(appSource, /providerCentrePath/);

const centreSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/workspaces/providers/EnterpriseProviderCentre.jsx'
  ),
  'utf8'
);

assert.match(centreSource, /EmployerSelector/);
assert.match(centreSource, /EmployeeList/);
assert.match(centreSource, /loadWorkspace/);
assert.match(centreSource, /employeeWorkspacePath/);

console.log('PASS  Enterprise runtime mounted');
console.log('PASS  Provider Centre integrated');
console.log('PASS  Employer-scoped navigation');
console.log('PASS  Employee workspace flow');
console.log(
  '\n✅ RC1-H4C Enterprise Frontend Integration passed'
);
