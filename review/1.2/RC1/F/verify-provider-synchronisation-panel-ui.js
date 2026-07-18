#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log(
  'RC1-F Provider Synchronisation Panel UI'
);
console.log();

const root = path.resolve(
  __dirname,
  '../../../../products/tax-payroll/frontend/src'
);

function read(relative) {
  return fs.readFileSync(
    path.join(root, relative),
    'utf8'
  );
}

[
  'workspaces/employees/provider/ProviderPanel.jsx',
  'workspaces/employees/provider/ProviderSummaryCard.jsx',
  'workspaces/employees/provider/ProviderStatusBadge.jsx',
  'workspaces/employees/provider/ProviderDiagnosticsList.jsx',
  'workspaces/employees/provider/ProviderHistoryTimeline.jsx',
  'workspaces/employees/provider/ProviderConflictList.jsx',
  'workspaces/employees/provider/ProviderActions.jsx',
].forEach((relative) => {
  assert(
    fs.existsSync(path.join(root, relative)),
    `${relative} is missing`
  );
});

console.log(
  'PASS  Provider panel components'
);

const panel = read(
  'workspaces/employees/provider/ProviderPanel.jsx'
);

[
  'ProviderSummaryCard',
  'ProviderDiagnosticsList',
  'ProviderHistoryTimeline',
  'ProviderConflictList',
  'ProviderActions',
].forEach((component) => {
  assert(
    panel.includes(component),
    `${component} is not integrated`
  );
});

console.log(
  'PASS  Provider panel composition'
);

const summary = read(
  'workspaces/employees/provider/ProviderSummaryCard.jsx'
);

assert(
  summary.includes(
    'summary.synchronisationState'
  )
);

assert(
  summary.includes(
    'summary.providerEmployeeId'
  )
);

console.log(
  'PASS  Provider summary rendering'
);

const conflicts = read(
  'workspaces/employees/provider/ProviderConflictList.jsx'
);

assert(
  conflicts.includes('enterpriseValue')
);

assert(
  conflicts.includes('providerValue')
);

assert(
  conflicts.includes('onSelectSection')
);

console.log(
  'PASS  Conflict rendering and navigation'
);

const shell = read(
  'workspaces/employees/EnterpriseEmployeeWorkspace.jsx'
);

assert(
  shell.includes('<ProviderPanel')
);

assert(
  shell.includes('onRefresh={reload}')
);

assert(
  shell.includes(
    'prepareSynchronisation'
  )
);

console.log(
  'PASS  Provider panel integrated with shell'
);

const main = read('main.jsx');

assert(
  main.includes(
    'provider/provider-panel.css'
  )
);

console.log(
  'PASS  Provider presentation registered'
);

console.log();
console.log(
  '✅ RC1-F Provider Synchronisation Panel UI passed'
);
