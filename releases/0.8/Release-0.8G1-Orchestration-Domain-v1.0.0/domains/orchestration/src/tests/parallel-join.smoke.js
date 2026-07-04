import {
  createOrchestrationPlan,
  createOrchestrationStep,
  createOrchestrationService,
  OrchestrationPlanStatus,
  OrchestrationStepType
} from '../index.js';

const service = createOrchestrationService();

const plan = createOrchestrationPlan({
  firmId: 'firm_001',
  key: 'parallel_join_test',
  name: 'Parallel Join Test',
  status: OrchestrationPlanStatus.ACTIVE,
  steps: [
    createOrchestrationStep({
      key: 'start',
      title: 'Start',
      type: OrchestrationStepType.ACTION,
      order: 1
    }),
    createOrchestrationStep({
      key: 'prepare_accounts',
      title: 'Prepare Accounts',
      type: OrchestrationStepType.WORKFLOW,
      order: 2,
      dependsOn: ['start']
    }),
    createOrchestrationStep({
      key: 'notify_client',
      title: 'Notify Client',
      type: OrchestrationStepType.AUTOMATION,
      order: 2,
      dependsOn: ['start']
    }),
    createOrchestrationStep({
      key: 'director_approval',
      title: 'Director Approval',
      type: OrchestrationStepType.APPROVAL,
      order: 3,
      dependsOn: ['prepare_accounts', 'notify_client']
    })
  ]
});

service.registerPlan(plan);

let execution = await service.startExecution({
  planKey: 'parallel_join_test',
  firmId: 'firm_001'
}, 'system');

execution = await service.completeStep(execution.id, 'start', 'system');

const afterStart = execution;

execution = await service.completeStep(execution.id, 'prepare_accounts', 'system');

const afterFirstBranch = execution;

execution = await service.completeStep(execution.id, 'notify_client', 'system');

const afterSecondBranch = execution;

console.log('AFTER_START_ACTIVE', afterStart.activeStepKeys.join(','));
console.log('AFTER_FIRST_ACTIVE', afterFirstBranch.activeStepKeys.join(','));
console.log('AFTER_FIRST_HAS_JOIN', afterFirstBranch.activeStepKeys.includes('director_approval'));
console.log('AFTER_SECOND_ACTIVE', afterSecondBranch.activeStepKeys.join(','));
console.log('AFTER_SECOND_HAS_JOIN', afterSecondBranch.activeStepKeys.includes('director_approval'));
console.log('CURRENT_STEP', afterSecondBranch.currentStepKey);
