'use strict';
function createProviderDiagnostics(i={}){return Object.freeze({
apiVersion:i.apiVersion||'v1',
connection:i.connection||'unknown',
latencyMs:i.latencyMs??null,
authentication:i.authentication||'unknown',
lastSuccessfulSync:i.lastSuccessfulSync||null,
lastFailedSync:i.lastFailedSync||null,
retryCount:i.retryCount||0,
lastError:i.lastError||null});}
module.exports={createProviderDiagnostics};
