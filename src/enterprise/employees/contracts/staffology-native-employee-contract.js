'use strict';
const { createHash } = require('crypto');
function deepClone(value){ return JSON.parse(JSON.stringify(value)); }
function normalise(value){
  if(Array.isArray(value)) return value.map(normalise);
  if(value && typeof value==='object') return Object.keys(value).sort().reduce((o,k)=>{o[k]=normalise(value[k]);return o;},{});
  return typeof value;
}
function createStaffologyNativeEmployee(rawEmployee={}){ return deepClone(rawEmployee); }
function employeeContractFingerprint(rawEmployee={}){
  return createHash('sha256').update(JSON.stringify(normalise(rawEmployee))).digest('hex');
}
function preserveUnknownFields(existing,incoming){
  if(!existing || typeof existing!=='object' || Array.isArray(existing)) return deepClone(incoming);
  if(!incoming || typeof incoming!=='object' || Array.isArray(incoming)) return deepClone(incoming);
  const merged=deepClone(existing);
  Object.entries(incoming).forEach(([key,value])=>{
    if(value && typeof value==='object' && !Array.isArray(value) && merged[key] && typeof merged[key]==='object' && !Array.isArray(merged[key])){
      merged[key]=preserveUnknownFields(merged[key],value);
    } else merged[key]=deepClone(value);
  });
  return merged;
}
module.exports={createStaffologyNativeEmployee,employeeContractFingerprint,preserveUnknownFields};
