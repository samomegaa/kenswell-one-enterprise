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
  key: 'parallel_detection_test',
  name: 'Parallel Detection Test',
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
  planKey: 'parallel_detection_test',
  firmId: 'firm_001'
}, 'system');

execution = await service.completeStep(execution.id, 'start', 'system');

console.log('STATUS', execution.status);
console.log('ACTIVE_STEPS', execution.activeStepKeys.length);
console.log('HAS_PREPARE', execution.activeStepKeys.includes('prepare_accounts'));
console.log('HAS_NOTIFY', execution.activeStepKeys.includes('notify_client'));
console.log('CURRENT_STEP', execution.currentStepKey);
