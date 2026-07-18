'use strict';
const {createProviderSummary}=require('./provider-summary');
const {createProviderDiagnostics}=require('./provider-diagnostics');
const {createHistory}=require('./provider-history');
module.exports={createProviderPanel(input={}){return Object.freeze({
summary:createProviderSummary(input.summary),
diagnostics:createProviderDiagnostics(input.diagnostics),
history:createHistory(input.history||[]),
conflicts:Object.freeze((input.conflicts||[]).map(c=>Object.freeze(c)))
});}};
