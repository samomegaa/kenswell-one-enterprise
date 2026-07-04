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

const service = createOrchestrationService({
  eventBus,
  stepHandlers: {
    [OrchestrationStepType.AUTOMATION]: async () => ({ status: 'COMPLETED', result: 'automation handled' }),
    [OrchestrationStepType.WORKFLOW]: async () => ({ status: 'COMPLETED', result: 'workflow started' }),
    [OrchestrationStepType.APPROVAL]: async () => ({ status: 'COMPLETED', result: 'approval received' })
  }
});

const plan = createOrchestrationPlan({
  firmId: 'firm_001',
  key: 'corporation_tax_conductor',
  name: 'Corporation Tax Conductor',
  status: OrchestrationPlanStatus.ACTIVE,
  steps: [
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
      dependsOn: ['classify_document']
    }),
    createOrchestrationStep({
      key: 'wait_for_approval',
      title: 'Wait for Approval',
      type: OrchestrationStepType.APPROVAL,
      order: 3,
      dependsOn: ['start_workflow']
    })
  ]
});

service.registerPlan(plan);

let execution = await service.startExecution({
  planKey: 'corporation_tax_conductor',
  firmId: 'firm_001',
  clientId: 'client_001',
  matterId: 'matter_001'
}, 'system');

execution = await service.completeStep(execution.id, 'classify_document', 'system');
execution = await service.completeStep(execution.id, 'start_workflow', 'system');
execution = await service.completeStep(execution.id, 'wait_for_approval', 'system');

console.log('PLANS', service.listPlans().length);
console.log('EXECUTIONS', service.listExecutions().length);
console.log('STATUS', execution.status);
console.log('COMPLETED_STEPS', execution.completedSteps.length);
console.log('CHECKPOINTS', service.listCheckpoints().length);
console.log('OUTCOMES', service.listOutcomes().length);
console.log('EVENTS', eventBus.getPublishedEvents().length);
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
