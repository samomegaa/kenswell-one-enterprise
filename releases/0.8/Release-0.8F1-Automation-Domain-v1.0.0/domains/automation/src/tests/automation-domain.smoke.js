import {
  createAutomationRule,
  createAutomationTrigger,
  createAutomationCondition,
  createAutomationAction,
  createAutomationExecution,
  AutomationRuleStatus,
  AutomationTriggerType,
  AutomationActionType
} from '../index.js';

const trigger = createAutomationTrigger({
  type: AutomationTriggerType.EVENT,
  eventType: 'document.classified'
});

const condition = createAutomationCondition({
  field: 'documentType',
  value: 'CORPORATION_TAX_RETURN'
});

const action = createAutomationAction({
  type: AutomationActionType.START_WORKFLOW,
  payload: {
    workflowKey: 'corporation_tax_return'
  }
});

const rule = createAutomationRule({
  firmId: 'firm_001',
  key: 'start_ct_workflow_on_classification',
  name: 'Start Corporation Tax Workflow on Classification',
  status: AutomationRuleStatus.ENABLED,
  triggers: [trigger],
  conditions: [condition],
  actions: [action],
  createdBy: 'system'
});

const execution = createAutomationExecution({
  ruleId: rule.id,
  triggerEventId: 'event_001',
  triggerType: trigger.type
});

console.log('RULE', rule.name);
console.log('STATUS', rule.status);
console.log('TRIGGERS', rule.triggers.length);
console.log('CONDITIONS', rule.conditions.length);
console.log('ACTIONS', rule.actions.length);
console.log('EXECUTION', execution.status);
