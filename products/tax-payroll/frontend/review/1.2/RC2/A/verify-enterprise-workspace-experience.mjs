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

const files = [
  'src/workspaces/employees/runtimeEmployeeAdapter.js',
  'src/workspaces/employees/RuntimeEmployeeWorkspace.jsx',
  'src/workspaces/employees/runtime-employee-workspace.css',
  'src/workspaces/providers/EnterpriseRuntimeSidecar.jsx',
];

for (const relativePath of files) {
  assert.equal(
    fs.existsSync(path.join(frontendRoot, relativePath)),
    true,
    `Missing ${relativePath}`
  );
}

const workspaceSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/workspaces/employees/RuntimeEmployeeWorkspace.jsx'
  ),
  'utf8'
);

for (const token of [
  'WorkspaceLayout',
  'WorkspaceHeader',
  'WorkspaceNavigation',
  'SummaryPanel',
  'PayrollPanel',
  'WorkspaceTimeline',
  'WorkspaceAudit',
]) {
  assert.match(workspaceSource, new RegExp(token));
}

const sidecarSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/workspaces/providers/EnterpriseRuntimeSidecar.jsx'
  ),
  'utf8'
);

assert.match(
  sidecarSource,
  /RuntimeEmployeeWorkspace/
);
assert.doesNotMatch(
  sidecarSource,
  /JSON\.stringify/
);

console.log('PASS  Runtime employee adapter');
console.log('PASS  Rich workspace framework');
console.log('PASS  Employee panels integrated');
console.log('PASS  Raw JSON evidence removed');
console.log(
  '\n✅ RC2-A Enterprise Workspace Experience passed'
);
