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
  key: 'resume_pause_test',
  name: 'Resume Pause Test',
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

let execution = await service.startExecution({
  planKey: 'resume_pause_test',
  firmId: 'firm_001',
  clientId: 'client_001',
  matterId: 'matter_001'
}, 'system');

const wait = service.startWait(execution.id, {
  type: 'APPROVAL',
  reason: 'Awaiting Director Approval'
}, 'system');

execution = service.resumeExecution(execution.id, 'director_001', {
  decision: 'APPROVED'
});

const waitState = service.listWaitStates(execution.id)[0];

console.log('EXECUTIONS', service.listExecutions().length);
console.log('STATUS', execution.status);
console.log('WAIT_STATES', service.listWaitStates().length);
console.log('WAIT_RESUMED', Boolean(waitState.resumedAt));
console.log('RESUMED_BY', waitState.metadata.resumedBy);
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
