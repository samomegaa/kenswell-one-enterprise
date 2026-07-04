import {
  createOrchestrationPlan,
  createOrchestrationStep,
  createOrchestrationService,
  OrchestrationPlanStatus,
  OrchestrationStepType
} from '../index.js';

const eventBus = {
  events: [],
  publish(event) {
    this.events.push(event);
  },
  getPublishedEvents() {
    return this.events;
  }
};

const service = createOrchestrationService({ eventBus });

const plan = createOrchestrationPlan({
  firmId: 'firm_001',
  key: 'parallel_completion_test',
  name: 'Parallel Completion Test',
  status: OrchestrationPlanStatus.ACTIVE,
  steps: [
    createOrchestrationStep({ key: 'start', title: 'Start', type: OrchestrationStepType.ACTION, order: 1 }),
    createOrchestrationStep({ key: 'prepare_accounts', title: 'Prepare Accounts', type: OrchestrationStepType.WORKFLOW, order: 2, dependsOn: ['start'] }),
    createOrchestrationStep({ key: 'notify_client', title: 'Notify Client', type: OrchestrationStepType.AUTOMATION, order: 2, dependsOn: ['start'] }),
    createOrchestrationStep({ key: 'director_approval', title: 'Director Approval', type: OrchestrationStepType.APPROVAL, order: 3, dependsOn: ['prepare_accounts', 'notify_client'] })
  ]
});

service.registerPlan(plan);

let execution = await service.startExecution({ planKey: 'parallel_completion_test', firmId: 'firm_001' }, 'system');

execution = await service.completeStep(execution.id, 'start', 'system');
execution = await service.completeStep(execution.id, 'prepare_accounts', 'system');
execution = await service.completeStep(execution.id, 'notify_client', 'system');
execution = await service.completeStep(execution.id, 'director_approval', 'system');

console.log('STATUS', execution.status);
console.log('COMPLETED_STEPS', execution.completedSteps.length);
console.log('ACTIVE_STEPS', execution.activeStepKeys.length);
console.log('CHECKPOINTS', service.listCheckpoints().length);
console.log('OUTCOMES', service.listOutcomes().length);
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
