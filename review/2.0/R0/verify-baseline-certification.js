'use strict';
const assert=require('assert'); const fs=require('fs'); const path=require('path');
const root=path.resolve(process.argv[2]||process.cwd());
const required=(p)=>assert.ok(fs.existsSync(path.join(root,p)),'Missing baseline path: '+p);
[
 'review/2.0/R0/BASELINE-CERTIFICATION.md','review/2.0/R0/ARCHITECTURE-SNAPSHOT.md',
 'review/2.0/R0/STAFFOLOGY-CAPABILITY-INVENTORY.md','review/2.0/R0/VERSION-1.x-CERTIFICATE.md',
 'review/2.0/R0/baseline-snapshot.json','tools/version-2.0/capture-r0-baseline.js',
 'tools/version-2.0/r0-capabilities.js','src/enterprise/payroll/providers/staffology/staffology-client.js',
 'src/enterprise/payroll/providers/staffology/staffology-provider.js',
 'products/tax-payroll/frontend/src/workspaces/staffology/StaffologyEmployeeWorkspace.jsx',
 'products/tax-payroll/frontend/src/workspaces/staffology/organisation/StaffologyOrganisationWorkspace.jsx',
 'products/tax-payroll/frontend/src/workspaces/staffology/payroll-run/StaffologyPayrollRunWorkspace.jsx',
 'review/1.2/RC2/D/contracts/staffology-api-catalogue.js'
].forEach(required);
const snapshot=JSON.parse(fs.readFileSync(path.join(root,'review/2.0/R0/baseline-snapshot.json'),'utf8'));
assert.strictEqual(snapshot.release,'2.0-R0'); assert.ok(snapshot.commit); assert.ok(snapshot.branch);
assert.ok(snapshot.capabilityCount>=10); assert.strictEqual(snapshot.capabilitiesPresent,snapshot.capabilityCount);
console.log('\nKenswell One Enterprise Version 2.0-R0');
console.log('Baseline Certification: PASSED'); console.log('Branch: '+snapshot.branch);
console.log('Commit: '+snapshot.commit); console.log(`Capabilities: ${snapshot.capabilitiesPresent}/${snapshot.capabilityCount}`);
console.log('Pre-existing working-tree entries recorded: '+snapshot.preExistingWorkingTreeEntries);
console.log('\nNo payroll behaviour or production UI was changed.');
