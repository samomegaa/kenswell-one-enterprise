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
  key: 'approval_request_test',
  name: 'Approval Request Test',
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
  planKey: 'approval_request_test',
  firmId: 'firm_001',
  clientId: 'client_001',
  matterId: 'matter_001'
}, 'system');

const approval = service.requestApproval(execution.id, {
  stepKey: 'director_approval',
  requestedFrom: 'director_001',
  reason: 'Awaiting Director Approval'
}, 'system');

const decision = service.decideApproval(approval.id, {
  type: 'APPROVE',
  notes: 'Approved for filing'
}, 'director_001');

console.log('APPROVALS', service.listApprovalRequests().length);
console.log('APPROVAL_STATUS', decision.approval.status);
console.log('EXECUTION_STATUS', decision.execution.status);
console.log('WAIT_STATES', service.listWaitStates().length);
console.log('WAIT_RESUMED', Boolean(service.listWaitStates()[0].resumedAt));
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
