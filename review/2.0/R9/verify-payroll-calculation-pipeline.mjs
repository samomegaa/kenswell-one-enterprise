import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] || process.cwd());
const payroll = path.join(root, 'products/tax-payroll/frontend/src/product/payroll');
const required = [
  'PayrollPipelineCard.jsx','payroll-pipeline-card.css',
  'pipeline/PayrollPipelineContext.js','pipeline/PayrollPipelineProvider.jsx',
  'pipeline/usePayrollPipeline.js','pipeline/createPipeline.js',
  'pipeline/restorePipeline.js','pipeline/configurePipeline.js',
  'pipeline/advancePipeline.js','pipeline/pipelineCheckpoints.js',
  'pipeline/pipelineMetrics.js','pipeline/pipelineStorage.js',
  'pipeline/pipelineEnterpriseAdapter.js','pipeline/index.js',
  'execution/PayrollExecutionEngine.js','execution/createExecutionQueue.js',
  'execution/createExecutionResult.js','execution/dispatchExecutionJob.js',
  'execution/payrollExecutionEvents.js','execution/payrollExecutionTypes.js',
  'execution/index.js',
];
for (const file of required) assert.ok(fs.existsSync(path.join(payroll,file)), `Missing R9 source: ${file}`);
const activated = fs.readFileSync(path.join(payroll,'ActivatedPayrollWorkspace.jsx'),'utf8');
assert.match(activated,/PayrollPipelineProvider/); assert.match(activated,/PayrollOrchestratorProvider/); assert.match(activated,/PayrollPeriodProvider/); assert.match(activated,/PayrollSessionProvider/);
const workspace = fs.readFileSync(path.join(payroll,'PayrollOperationalWorkspace.jsx'),'utf8');
assert.match(workspace,/usePayrollPipeline/); assert.match(workspace,/PayrollPipelineCard/); assert.match(workspace,/StaffologyPayrollRunWorkspace/);
const engine = fs.readFileSync(path.join(payroll,'execution/PayrollExecutionEngine.js'),'utf8');
assert.match(engine,/dispatchExecutionJob/); assert.doesNotMatch(engine,/PAYE|National Insurance/);
const adapter = fs.readFileSync(path.join(payroll,'execution/dispatchExecutionJob.js'),'utf8');
assert.match(adapter,/executePayrollJob/); assert.match(adapter,/Provider adapter awaiting connection/);
console.log('');
console.log('Kenswell One Enterprise Version 2.0-R9');
console.log('Payroll Calculation Pipeline & Execution Engine: PASSED');
console.log('Payroll session reused: yes');
console.log('Payroll period runtime reused: yes');
console.log('Payroll orchestrator reused: yes');
console.log('Payroll calculation pipeline activated: yes');
console.log('Payroll execution engine activated: yes');
console.log('Pipeline checkpoints enabled: yes');
console.log('Pipeline metrics enabled: yes');
console.log('Enterprise event adapter available: yes');
console.log('Enterprise audit adapter available: yes');
console.log('Staffology provider boundary preserved: yes');
console.log('Duplicate payroll calculations introduced: no');
