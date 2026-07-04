import {
  createOrchestrationPlan,
  createOrchestrationStep,
  createOrchestrationDecision,
  createOrchestrationExecution,
  createOrchestrationCheckpoint,
  createOrchestrationOutcome,
  OrchestrationPlanStatus,
  OrchestrationStepType,
  OrchestrationExecutionStatus
} from '../index.js';

const steps = [
  createOrchestrationStep({
    key: 'classify_document',
    title: 'Classify Document',
    type: OrchestrationStepType.AUTOMATION,
    order: 1
  }),
  createOrchestrationStep({
    key: 'start_workflow',
    title: 'Start Workflow',
    type: OrchestrationStepType.WORKFLOW,
    order: 2,
    dependsOn: ['classify_document'],
    workflowKey: 'corporation_tax_return'
  }),
  createOrchestrationStep({
    key: 'wait_for_approval',
    title: 'Wait for Director Approval',
    type: OrchestrationStepType.APPROVAL,
    order: 3,
    dependsOn: ['start_workflow']
  })
];

const decision = createOrchestrationDecision({
  field: 'payload.documentType',
  value: 'CORPORATION_TAX_RETURN',
  trueStepKey: 'start_workflow',
  falseStepKey: 'stop'
});

const plan = createOrchestrationPlan({
  firmId: 'firm_001',
  key: 'corporation_tax_conductor',
  name: 'Corporation Tax Conductor',
  status: OrchestrationPlanStatus.ACTIVE,
  steps,
  decisions: [decision],
  createdBy: 'system'
});

const execution = createOrchestrationExecution({
  planId: plan.id,
  planKey: plan.key,
  firmId: 'firm_001',
  clientId: 'client_001',
  matterId: 'matter_001',
  status: OrchestrationExecutionStatus.RUNNING,
  currentStepKey: 'classify_document',
  startedBy: 'system'
});

const checkpoint = createOrchestrationCheckpoint({
  executionId: execution.id,
  stepKey: 'classify_document',
  status: 'COMPLETED'
});

const outcome = createOrchestrationOutcome({
  executionId: execution.id,
  summary: 'Corporation tax orchestration created successfully'
});

console.log('PLAN', plan.name);
console.log('STATUS', plan.status);
console.log('STEPS', plan.steps.length);
console.log('DECISIONS', plan.decisions.length);
console.log('EXECUTION', execution.status);
console.log('CURRENT_STEP', execution.currentStepKey);
console.log('CHECKPOINT', checkpoint.stepKey);
console.log('OUTCOME', outcome.status);
