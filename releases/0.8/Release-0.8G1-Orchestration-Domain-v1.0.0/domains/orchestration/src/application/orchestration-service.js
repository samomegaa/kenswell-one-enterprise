import {
  createOrchestrationExecution,
  createOrchestrationCheckpoint,
  createOrchestrationOutcome,
  createWaitState,
  createApprovalRequest,
  ApprovalStatus,
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
  const waitStates = [];
  const approvalRequests = [];

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

  async function runStep(step, context) {
    const handler = stepHandlers.get(step.type) || stepHandlers.get(step.key);

    if (!handler) {
      return {
        status: 'SKIPPED',
        reason: `No handler registered for step ${step.key}`
      };
    }

    return handler(step, context);
  }

  async function completeStep(executionId, stepKey, actorId = 'system', payload = {}) {
    const execution = executions.find(item => item.id === executionId);

    if (!execution) {
      throw new Error(`Orchestration execution not found: ${executionId}`);
    }

    const plan = getPlan(execution.planId);

    if (!plan) {
      throw new Error(`Orchestration plan not found: ${execution.planId}`);
    }

    const step = plan.steps.find(item => item.key === stepKey);

    if (!step) {
      throw new Error(`Orchestration step not found: ${stepKey}`);
    }

    const result = await runStep(step, { execution, plan, payload, actorId });

    execution.completedSteps = [...new Set([...(execution.completedSteps || []), stepKey])];
    execution.currentStepKey = null;
    execution.updatedAt = nowIso();

    const checkpoint = createOrchestrationCheckpoint({
      executionId,
      stepKey,
      status: result.status || 'COMPLETED',
      payload: result,
      metadata: { actorId }
    });

    checkpoints.push(checkpoint);

    publish('orchestration.step.completed', {
      executionId,
      stepKey,
      result
    });

    publish('orchestration.checkpoint.recorded', {
      executionId,
      checkpointId: checkpoint.id,
      stepKey
    });

    const nextStep = getNextStep(plan, execution);

    if (nextStep) {
      execution.currentStepKey = nextStep.key;

      publish('orchestration.step.started', {
        executionId,
        stepKey: nextStep.key
      });
    } else {
      execution.status = OrchestrationExecutionStatus.COMPLETED;
      execution.completedAt = nowIso();
      execution.updatedAt = execution.completedAt;

      const outcome = createOrchestrationOutcome({
        executionId,
        status: 'SUCCESS',
        summary: `Orchestration ${plan.name} completed`,
        results: checkpoints.filter(item => item.executionId === executionId)
      });

      outcomes.push(outcome);

      publish('orchestration.execution.completed', {
        executionId,
        outcomeId: outcome.id
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

  function startWait(executionId, input = {}, actorId = 'system') {
    const execution = executions.find(item => item.id === executionId);

    if (!execution) {
      throw new Error(`Orchestration execution not found: ${executionId}`);
    }

    const wait = createWaitState({
      executionId,
      type: input.type || 'APPROVAL',
      reason: input.reason || 'Waiting',
      metadata: {
        ...(input.metadata || {}),
        actorId
      }
    });

    waitStates.push(wait);

    execution.status = OrchestrationExecutionStatus.WAITING;
    execution.updatedAt = nowIso();

    publish('orchestration.wait.started', {
      executionId,
      waitStateId: wait.id,
      type: wait.type,
      reason: wait.reason
    });

    return clone(wait);
  }

  function resumeExecution(executionId, actorId = 'system', metadata = {}) {
    const execution = executions.find(item => item.id === executionId);

    if (!execution) {
      throw new Error(`Orchestration execution not found: ${executionId}`);
    }

    const activeWait = [...waitStates]
      .reverse()
      .find(item => item.executionId === executionId && !item.resumedAt);

    if (activeWait) {
      activeWait.resumedAt = nowIso();
      activeWait.updatedAt = activeWait.resumedAt;
      activeWait.metadata = {
        ...(activeWait.metadata || {}),
        resumedBy: actorId,
        resumeMetadata: metadata
      };
    }

    execution.status = OrchestrationExecutionStatus.RUNNING;
    execution.updatedAt = nowIso();

    publish('orchestration.wait.resumed', {
      executionId,
      waitStateId: activeWait?.id || null,
      actorId
    });

    return clone(execution);
  }

  function listWaitStates(executionId = null) {
    return waitStates
      .filter(item => !executionId || item.executionId === executionId)
      .map(clone);
  }

  function requestApproval(executionId, input = {}, actorId = 'system') {
    const execution = executions.find(item => item.id === executionId);

    if (!execution) {
      throw new Error(`Orchestration execution not found: ${executionId}`);
    }

    const approval = createApprovalRequest({
      executionId,
      stepKey: input.stepKey || execution.currentStepKey,
      requestedFrom: input.requestedFrom || null,
      requestedBy: actorId,
      dueAt: input.dueAt || null,
      notes: input.notes || null,
      metadata: input.metadata || {}
    });

    approvalRequests.push(approval);

    startWait(executionId, {
      type: 'APPROVAL',
      reason: input.reason || `Awaiting approval for ${approval.stepKey}`,
      metadata: {
        approvalRequestId: approval.id
      }
    }, actorId);

    publish('orchestration.approval.requested', {
      executionId,
      approvalRequestId: approval.id,
      stepKey: approval.stepKey,
      requestedFrom: approval.requestedFrom
    });

    return clone(approval);
  }

  function decideApproval(approvalRequestId, decision = {}, actorId = 'system') {
    const approval = approvalRequests.find(item => item.id === approvalRequestId);

    if (!approval) {
      throw new Error(`Approval request not found: ${approvalRequestId}`);
    }

    const approved = decision.type === 'APPROVE';

    approval.status = approved ? ApprovalStatus.APPROVED : ApprovalStatus.REJECTED;
    approval.updatedAt = nowIso();
    approval.metadata = {
      ...(approval.metadata || {}),
      decidedBy: actorId,
      decision
    };

    const execution = resumeExecution(approval.executionId, actorId, {
      approvalRequestId,
      decision
    });

    publish(approved ? 'orchestration.approval.approved' : 'orchestration.approval.rejected', {
      executionId: approval.executionId,
      approvalRequestId,
      actorId
    });

    return {
      approval: clone(approval),
      execution
    };
  }

  function listApprovalRequests(executionId = null) {
    return approvalRequests
      .filter(item => !executionId || item.executionId === executionId)
      .map(clone);
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
    completeStep,
    listCheckpoints,
    listOutcomes,
    startWait,
    resumeExecution,
    requestApproval,
    decideApproval,
    listApprovalRequests,
    listWaitStates,
    registerStepHandler
  };
}
