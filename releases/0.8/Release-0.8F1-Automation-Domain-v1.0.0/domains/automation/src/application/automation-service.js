import {
  createAutomationExecution,
  AutomationRuleStatus,
  AutomationExecutionStatus
} from '../index.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getByPath(object, path) {
  return String(path || '').split('.').filter(Boolean).reduce((cur, key) => cur?.[key], object);
}

function conditionMatches(condition, event) {
  const actual = getByPath(event, condition.field);

  if (condition.operator === 'NOT_EQUALS') return actual !== condition.value;
  if (condition.operator === 'CONTAINS') return String(actual || '').includes(String(condition.value));
  if (condition.operator === 'EXISTS') return actual !== undefined && actual !== null && actual !== '';

  return actual === condition.value;
}

function triggerMatches(trigger, event) {
  if (!trigger.enabled) return false;
  return trigger.type === 'EVENT' && (!trigger.eventType || trigger.eventType === event.type);
}

export function createAutomationService(options = {}) {
  const eventBus = options.eventBus || null;
  const actionHandlers = new Map(Object.entries(options.actionHandlers || {}));
  const rules = [];
  const executions = [];

  function publish(type, payload = {}) {
    const event = { type, payload, createdAt: new Date().toISOString() };
    if (eventBus?.publish) eventBus.publish(event);
    return event;
  }

  function registerRule(rule) {
    const index = rules.findIndex(item => item.id === rule.id || item.key === rule.key);
    if (index >= 0) rules[index] = clone(rule);
    else rules.push(clone(rule));

    publish('automation.rule.created', { ruleId: rule.id, key: rule.key });
    return clone(rule);
  }

  function listRules() {
    return rules.map(clone);
  }

  function listEnabledRules() {
    return rules.filter(rule => rule.status === AutomationRuleStatus.ENABLED).map(clone);
  }

  function listExecutions() {
    return executions.map(clone);
  }

  function registerActionHandler(type, handler) {
    actionHandlers.set(type, handler);
  }

  async function executeAction(action, context) {
    const handler = actionHandlers.get(action.type);

    if (!handler) {
      return {
        actionId: action.id,
        type: action.type,
        status: 'SKIPPED',
        reason: `No handler registered for ${action.type}`
      };
    }

    const result = await handler(action, context);
    return { actionId: action.id, type: action.type, status: 'SUCCESS', result: result || null };
  }

  async function handleEvent(event, actorId = 'system') {
    const matchedRules = listEnabledRules().filter(rule => {
      return rule.triggers.some(trigger => triggerMatches(trigger, event))
        && rule.conditions.every(condition => conditionMatches(condition, event));
    });

    const results = [];

    if (matchedRules.length === 0) {
      publish('automation.execution.skipped', {
        eventType: event.type,
        reason: 'No matching enabled automation rules'
      });
      return results;
    }

    for (const rule of matchedRules) {
      const execution = createAutomationExecution({
        ruleId: rule.id,
        triggerEventId: event.id || null,
        triggerType: event.type,
        status: AutomationExecutionStatus.PENDING,
        payload: event,
        metadata: { actorId }
      });

      executions.push(execution);
      publish('automation.execution.started', { executionId: execution.id, ruleId: rule.id });

      try {
        const actionResults = [];

        for (const action of rule.actions.filter(item => item.enabled !== false)) {
          actionResults.push(await executeAction(action, { event, rule, execution, actorId }));
        }

        execution.status = AutomationExecutionStatus.SUCCESS;
        execution.result = { actionResults };
        execution.completedAt = new Date().toISOString();
        execution.updatedAt = execution.completedAt;

        publish('automation.execution.completed', {
          executionId: execution.id,
          ruleId: rule.id,
          actionResults
        });

        results.push(clone(execution));
      } catch (error) {
        execution.status = AutomationExecutionStatus.FAILED;
        execution.error = error.message;
        execution.completedAt = new Date().toISOString();
        execution.updatedAt = execution.completedAt;

        publish('automation.execution.failed', {
          executionId: execution.id,
          ruleId: rule.id,
          error: error.message
        });

        results.push(clone(execution));
      }
    }

    return results;
  }

  return {
    registerRule,
    listRules,
    listEnabledRules,
    listExecutions,
    registerActionHandler,
    handleEvent
  };
}
