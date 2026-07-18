'use strict';
function createProviderSummary(i={}){return Object.freeze({
provider:i.provider||'staffology',
employeeId:i.employeeId||null,
employerId:i.employerId||null,
contractFingerprint:i.contractFingerprint||null,
contractVersion:i.contractVersion||'1.0',
lastSynchronisedAt:i.lastSynchronisedAt||null,
synchronisationState:i.synchronisationState||'never-synced'
});}
module.exports={createProviderSummary};
