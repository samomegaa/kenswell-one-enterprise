#!/usr/bin/env node
const assert=require('assert');
const {SYNC_STATES,createProviderSummary,createProviderDiagnostics,createHistory,createConflict,createProviderPanel}=require('../../../src/enterprise/payroll/workspace/provider');
console.log('Provider Synchronisation Panel\n');
const s=createProviderSummary({employeeId:'E1',employerId:'ER1',synchronisationState:SYNC_STATES.IN_SYNC});
assert.equal(s.synchronisationState,'in-sync');console.log('PASS Provider summary');
const d=createProviderDiagnostics({connection:'online'});assert.equal(d.connection,'online');console.log('PASS Diagnostics');
const h=createHistory([{event:'uploaded'}]);assert.equal(h.length,1);console.log('PASS History');
const c=createConflict({field:'tax.taxCode',local:'1257L',remote:'BR'});assert.equal(c.resolution,'pending');console.log('PASS Conflict');
const p=createProviderPanel({summary:s,diagnostics:d,history:h,conflicts:[c]});assert(p.summary&&p.diagnostics);console.log('PASS Panel aggregation');
console.log('\n✅ Provider Synchronisation Panel passed');
