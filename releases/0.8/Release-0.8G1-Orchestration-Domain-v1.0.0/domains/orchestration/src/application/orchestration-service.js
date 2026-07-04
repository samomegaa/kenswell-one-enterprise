import {
  createOrchestrationExecution,
  OrchestrationPlanStatus,
  OrchestrationExecutionStatus
} from '../index.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

export function createOrchestrationService(options = {}) {
  const eventBus = options.eventBus || null;
  const stepHandlers = new Map(Object.entries(options.stepHandlers || {}));

  const plans = [];
  const executions = [];
  const checkpoints = [];
  const outcomes = [];

  function publish(type, payload = {}) {
    const event = { type, payload, createdAt: nowIso() };

    if (eventBus?.publish) {
      eventBus.publish(event);
    }

    return event;
  }

  function registerPlan(plan) {
    const index = plans.findIndex(item => item.id === plan.id || item.key === plan.key);

    if (index >= 0) {
      plans[index] = clone(plan);
    } else {
      plans.push(clone(plan));
    }

    publish('orchestration.plan.created', { planId: plan.id, key: plan.key });

    return clone(plan);
  }

  function listPlans() {
    return plans.map(clone);
  }

  function getPlan(planId) {
    const plan = plans.find(item => item.id === planId || item.key === planId);
    return plan ? clone(plan) : null;
  }

  function getExecution(executionId) {
    const execution = executions.find(item => item.id === executionId);
    return execution ? clone(execution) : null;
  }

  function getNextStep(plan, execution) {
    const completed = new Set(execution.completedSteps || []);

    return [...(plan.steps || [])]
      .sort((a, b) => a.order - b.order)
      .find(step => {
        if (completed.has(step.key)) return false;
        return (step.dependsOn || []).every(key => completed.has(key));
      }) || null;
  }

  async function startExecution(input = {}, actorId = 'system') {
    const plan = getPlan(input.planId || input.planKey);

    if (!plan) {
      throw new Error(`Orchestration plan not found: ${input.planId || input.planKey}`);
    }

    if (plan.status !== OrchestrationPlanStatus.ACTIVE) {
      throw new Error(`Orchestration plan is not active: ${plan.key}`);
    }

    const execution = createOrchestrationExecution({
      planId: plan.id,
      planKey: plan.key,
      firmId: input.firmId,
      clientId: input.clientId,
      matterId: input.matterId,
      workflowId: input.workflowId,
      status: OrchestrationExecutionStatus.RUNNING,
      startedBy: actorId,
      metadata: input.metadata || {}
    });

    const nextStep = getNextStep(plan, execution);

    if (nextStep) {
      execution.currentStepKey = nextStep.key;
    }

    executions.push(execution);

    publish('orchestration.execution.started', {
      executionId: execution.id,
      planId: plan.id,
      planKey: plan.key
    });

    if (nextStep) {
      publish('orchestration.step.started', {
        executionId: execution.id,
        stepKey: nextStep.key
      });
    }

    return clone(execution);
  }

  function listExecutions() {
    return executions.map(clone);
  }

  function listCheckpoints() {
    return checkpoints.map(clone);
  }

  function listOutcomes() {
    return outcomes.map(clone);
  }

  function registerStepHandler(typeOrKey, handler) {
    stepHandlers.set(typeOrKey, handler);
  }

  return {
    registerPlan,
    listPlans,
    getPlan,
    listExecutions,
    getExecution,
    startExecution,
    listCheckpoints,
    listOutcomes,
    registerStepHandler
  };
}
