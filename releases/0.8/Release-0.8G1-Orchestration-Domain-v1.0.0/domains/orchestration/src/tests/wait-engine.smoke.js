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
  key: 'approval_pause_test',
  name: 'Approval Pause Test',
  status: OrchestrationPlanStatus.ACTIVE,
  steps: [
    createOrchestrationStep({
      key: 'director_approval',
      title: 'Director Approval',
      type: OrchestrationStepType.APPROVAL,
      order: 1
    })
  ]
});

service.registerPlan(plan);

const execution = await service.startExecution({
  planKey: 'approval_pause_test',
  firmId: 'firm_001',
  clientId: 'client_001',
  matterId: 'matter_001'
}, 'system');

const wait = service.startWait(execution.id, {
  type: 'APPROVAL',
  reason: 'Awaiting Director Approval'
}, 'system');

console.log('EXECUTIONS', service.listExecutions().length);
console.log('WAIT_STATUS', service.getExecution(execution.id).status);
console.log('WAIT_STATES', service.listWaitStates().length);
console.log('WAIT_REASON', wait.reason);
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
