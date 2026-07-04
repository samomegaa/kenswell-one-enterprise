import {
  createAutomationRule,
  createAutomationTrigger,
  createAutomationCondition,
  createAutomationAction,
  createAutomationService,
  AutomationRuleStatus,
  AutomationTriggerType,
  AutomationActionType
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

let startedWorkflow = false;

const service = createAutomationService({
  eventBus,
  actionHandlers: {
    [AutomationActionType.START_WORKFLOW]: async () => {
      startedWorkflow = true;
      return { workflowId: 'workflow_001' };
    }
  }
});

const rule = createAutomationRule({
  firmId: 'firm_001',
  key: 'start_ct_workflow_on_classification',
  name: 'Start Corporation Tax Workflow on Classification',
  status: AutomationRuleStatus.ENABLED,
  triggers: [
    createAutomationTrigger({
      type: AutomationTriggerType.EVENT,
      eventType: 'document.classified'
    })
  ],
  conditions: [
    createAutomationCondition({
      field: 'payload.documentType',
      value: 'CORPORATION_TAX_RETURN'
    })
  ],
  actions: [
    createAutomationAction({
      type: AutomationActionType.START_WORKFLOW,
      payload: { workflowKey: 'corporation_tax_return' }
    })
  ]
});

service.registerRule(rule);

const results = await service.handleEvent({
  id: 'event_001',
  type: 'document.classified',
  payload: {
    documentType: 'CORPORATION_TAX_RETURN'
  }
});

console.log('RULES', service.listRules().length);
console.log('ENABLED', service.listEnabledRules().length);
console.log('EXECUTIONS', service.listExecutions().length);
console.log('RESULTS', results.length);
console.log('STARTED_WORKFLOW', startedWorkflow);
console.log('STATUS', results[0].status);
console.log('EVENTS', eventBus.getPublishedEvents().length);
console.log('LAST_EVENT', eventBus.getPublishedEvents().at(-1).type);
