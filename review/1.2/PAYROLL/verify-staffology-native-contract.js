#!/usr/bin/env node
'use strict';
const assert=require('assert');
const {createStaffologyNativeEmployee,employeeContractFingerprint,preserveUnknownFields}=require('../../../src/enterprise/employees/contracts');
console.log('Staffology Native Employee Contract');console.log();
const raw={id:'employee-1',personalDetails:{firstName:'Test',lastName:'Employee'},taxAndNi:{taxCode:'1257L'},futureField:{providerValue:true}};
const native=createStaffologyNativeEmployee(raw);assert.deepStrictEqual(native,raw);assert.notStrictEqual(native,raw);console.log('PASS  Full Staffology shape preserved');
const a=employeeContractFingerprint(raw);const b=employeeContractFingerprint({futureField:{providerValue:false},taxAndNi:{taxCode:'BR'},personalDetails:{lastName:'Different',firstName:'Another'},id:'employee-2'});assert.strictEqual(a,b);console.log('PASS  Structural contract fingerprint');
const merged=preserveUnknownFields(raw,{personalDetails:{firstName:'Updated'}});assert.strictEqual(merged.personalDetails.firstName,'Updated');assert.strictEqual(merged.futureField.providerValue,true);assert.strictEqual(merged.taxAndNi.taxCode,'1257L');console.log('PASS  Unknown fields preserved on update');
console.log();console.log('✅ Staffology Native Employee Contract passed');
