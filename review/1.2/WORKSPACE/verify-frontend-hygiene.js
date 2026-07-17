#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../../..');
const frontend = path.join(root, 'products/tax-payroll/frontend');
const mainFile = path.join(frontend, 'src/main.jsx');
const ignored = new Set(['node_modules', 'dist', '.git']);
const checks = [];

function check(name, ok, detail = '') {
  checks.push({ name, ok: Boolean(ok) });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignored.has(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function repairArtifact(file) {
  const name = path.basename(file);
  return (
    name.endsWith('.before-repair') ||
    name.endsWith('.broken') ||
    name.endsWith('.patch.md') ||
    name.includes('.before-')
  );
}

console.log('Enterprise Frontend Consolidation & Repository Hygiene');
console.log('Revision 1');
console.log();

check('Canonical frontend exists', fs.existsSync(frontend));
check(
  'Accidental nested frontend absent',
  !fs.existsSync(path.join(frontend, 'products'))
);

const mainSource = fs.existsSync(mainFile)
  ? fs.readFileSync(mainFile, 'utf8')
  : '';

check(
  'Obsolete Workspace CSS import absent',
  !mainSource.includes("import './components/workspace/workspace.css';")
);
check(
  'Framework CSS import present',
  mainSource.includes("import './workspaces/framework/workspace.css';")
);
check(
  'Employee navigation CSS import present',
  mainSource.includes(
    "import './workspaces/client/payroll-employees-navigation.css';"
  )
);

const ownedFiles = walk(frontend);
const repairFiles = ownedFiles.filter(repairArtifact);
check('Repair artefacts absent', repairFiles.length === 0, repairFiles.join(', '));

const extensions = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.md',
  '.html', '.svg', '.txt', '.yml', '.yaml',
]);

const executable = ownedFiles.filter((file) => {
  const name = path.basename(file);
  const considered =
    extensions.has(path.extname(file).toLowerCase()) ||
    name === '.gitignore' ||
    name === '.oxlintrc.json';
  return considered && Boolean(fs.statSync(file).mode & 0o111);
});

check(
  'Owned source and configuration files are non-executable',
  executable.length === 0,
  executable.map((file) => path.relative(root, file)).join(', ')
);

[
  'src/workspaces/framework/WorkspaceLayout.jsx',
  'src/workspaces/framework/WorkspaceHeader.jsx',
  'src/workspaces/framework/WorkspaceNavigation.jsx',
  'src/workspaces/framework/workspace.css',
  'src/workspaces/employees/EmployeeWorkspace.jsx',
  'src/workspaces/employees/EmployeePanels.jsx',
  'src/workspaces/employees/useEmployeeWorkspace.js',
  'src/workspaces/client/tabs/PayrollEmployeesPanel.jsx',
  'src/workspaces/client/tabs/PayrollEmployeeTable.jsx',
].forEach((relative) => {
  check(`Required file ${relative}`, fs.existsSync(path.join(frontend, relative)));
});

const packageFile = path.join(frontend, 'package.json');
const packageJson = fs.existsSync(packageFile)
  ? JSON.parse(fs.readFileSync(packageFile, 'utf8'))
  : {};

check(
  'prop-types dependency installed',
  Boolean(
    packageJson.dependencies?.['prop-types'] ||
    packageJson.devDependencies?.['prop-types']
  )
);

console.log();
console.log('Ignored permission scopes: node_modules/, dist/, .git/');
console.log('Running production frontend build...');

const build = spawnSync('npm', ['run', 'build'], {
  cwd: frontend,
  encoding: 'utf8',
  stdio: 'pipe',
});

if (build.stdout) process.stdout.write(build.stdout);
if (build.stderr) process.stderr.write(build.stderr);

check('Production build', build.status === 0);

const failed = checks.filter((item) => !item.ok);
console.log();

if (failed.length) {
  console.error(`FAILED: ${failed.length} hygiene check(s) did not pass.`);
  process.exit(1);
}

console.log('✅ Enterprise Frontend Consolidation & Repository Hygiene passed');
