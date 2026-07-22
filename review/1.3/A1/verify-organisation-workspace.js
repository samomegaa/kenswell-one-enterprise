'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'../../../');
const frontend=path.join(root,'products/tax-payroll/frontend/src');
['workspaces/staffology/organisation/index.js','workspaces/staffology/organisation/StaffologyOrganisationWorkspace.jsx','workspaces/providers/EnterpriseRuntimeSidecar.jsx'].forEach((f)=>assert.ok(fs.existsSync(path.join(frontend,f)),`Missing ${f}`));
const s=fs.readFileSync(path.join(frontend,'workspaces/providers/EnterpriseRuntimeSidecar.jsx'),'utf8');
['StaffologyOrganisationWorkspace','Open organisation workspace','organisationOpen'].forEach((t)=>assert.ok(s.includes(t),`Missing ${t}`));
console.log('Staffology Organisation Workspace verification passed');
