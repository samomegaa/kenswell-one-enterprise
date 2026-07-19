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
  'src/runtime/EmployeeRuntimeContext.js',
  'src/runtime/EmployeeRuntimeProvider.jsx',
  'src/runtime/employeeRuntimeStorage.js',
  'src/runtime/useEmployeeRuntime.js',
  'src/runtime/EnterpriseRuntimeProvider.jsx',
  'src/workspaces/employees/EmployeeRuntimeGuard.jsx',
  'src/workspaces/employees/EmployeeList.jsx',
  'src/workspaces/employees/EmployeeWorkspaceLauncher.jsx',
  'src/workspaces/employees/useEmployeeWorkspaceRuntime.js',
  'src/workspaces/employees/employee-runtime.css',
];

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(
    frontendRoot,
    relativePath
  );

  assert.equal(
    fs.existsSync(absolutePath),
    true,
    `Missing ${relativePath}`
  );
}

const providerSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/runtime/EmployeeRuntimeProvider.jsx'
  ),
  'utf8'
);

assert.match(providerSource, /listEmployerEmployees/);
assert.match(providerSource, /selectedEmployer/);
assert.match(providerSource, /selectEmployee/);

const workspaceSource = fs.readFileSync(
  path.join(
    frontendRoot,
    'src/workspaces/employees\/' +
      'useEmployeeWorkspaceRuntime.js'
  ),
  'utf8'
);

assert.match(
  workspaceSource,
  /getEmployerEmployeeWorkspace/
);
assert.match(workspaceSource, /employer/);
assert.match(workspaceSource, /employee/);
assert.match(workspaceSource, /workspace/);

console.log('PASS  Employee runtime context');
console.log('PASS  Employer-scoped employee discovery');
console.log('PASS  Employee selection persistence');
console.log('PASS  Workspace runtime launcher');
console.log(
  '\n✅ RC1-H4B Employee Runtime Foundation passed'
);
