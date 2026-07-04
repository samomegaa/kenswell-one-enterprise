import {
  OrchestrationPlanStatus
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
    listCheckpoints,
    listOutcomes,
    registerStepHandler
  };
}
