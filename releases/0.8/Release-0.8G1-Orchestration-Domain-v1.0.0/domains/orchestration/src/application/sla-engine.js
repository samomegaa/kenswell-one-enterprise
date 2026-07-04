import {
  createDeadline,
  createSLABreach,
  DeadlineStatus,
  EscalationLevel
} from '../index.js';

export function addMinutes(dateInput, minutes) {
  return new Date(new Date(dateInput).getTime() + minutes * 60 * 1000).toISOString();
}

export function createDeadlineFromPolicy({ execution, stepKey = null, policy, startedAt = null }) {
  const start = startedAt || execution.startedAt || new Date().toISOString();

  return createDeadline({
    executionId: execution.id,
    stepKey,
    dueAt: addMinutes(start, policy.targetMinutes),
    metadata: {
      policyId: policy.id,
      policyKey: policy.key,
      targetMinutes: policy.targetMinutes
    }
  });
}

export function evaluateDeadline(deadline, now = new Date().toISOString()) {
  const currentTime = new Date(now).getTime();
  const dueTime = new Date(deadline.dueAt).getTime();

  if (deadline.status === DeadlineStatus.MET) {
    return {
      ...deadline,
      status: DeadlineStatus.MET,
      escalationLevel: deadline.escalationLevel
    };
  }

  if (currentTime > dueTime) {
    return {
      ...deadline,
      status: DeadlineStatus.OVERDUE,
      escalationLevel: EscalationLevel.CRITICAL,
      breachedAt: deadline.breachedAt || now,
      updatedAt: now
    };
  }

  const minutesUntilDue = Math.round((dueTime - currentTime) / 60000);

  if (minutesUntilDue <= 60) {
    return {
      ...deadline,
      status: DeadlineStatus.DUE_SOON,
      escalationLevel: EscalationLevel.WARNING,
      updatedAt: now
    };
  }

  return {
    ...deadline,
    status: DeadlineStatus.UPCOMING,
    escalationLevel: deadline.escalationLevel || EscalationLevel.NONE,
    updatedAt: now
  };
}

export function createBreachFromDeadline(deadline, reason = 'SLA deadline breached') {
  return createSLABreach({
    executionId: deadline.executionId,
    deadlineId: deadline.id,
    stepKey: deadline.stepKey,
    reason,
    severity: deadline.escalationLevel === EscalationLevel.CRITICAL ? 'CRITICAL' : 'HIGH'
  });
}
