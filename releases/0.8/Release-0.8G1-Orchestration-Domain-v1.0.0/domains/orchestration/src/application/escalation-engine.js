import {
  EscalationLevel,
  DeadlineStatus
} from '../index.js';

export function determineEscalation(deadline) {
  if (deadline.status === DeadlineStatus.OVERDUE) {
    return EscalationLevel.CRITICAL;
  }

  if (deadline.status === DeadlineStatus.DUE_SOON) {
    return EscalationLevel.WARNING;
  }

  return deadline.escalationLevel || EscalationLevel.NONE;
}

export function applyEscalation(deadline, now = new Date().toISOString()) {
  const level = determineEscalation(deadline);

  return {
    ...deadline,
    escalationLevel: level,
    escalatedAt:
      level === EscalationLevel.WARNING || level === EscalationLevel.CRITICAL
        ? deadline.escalatedAt || now
        : deadline.escalatedAt || null,
    updatedAt: now
  };
}

export function shouldEscalate(deadline) {
  return [
    EscalationLevel.WARNING,
    EscalationLevel.ESCALATED,
    EscalationLevel.CRITICAL
  ].includes(deadline.escalationLevel);
}

export function createEscalationNotice(deadline) {
  return {
    executionId: deadline.executionId,
    deadlineId: deadline.id,
    stepKey: deadline.stepKey,
    level: deadline.escalationLevel,
    message: `Deadline ${deadline.id} escalated to ${deadline.escalationLevel}`,
    createdAt: new Date().toISOString()
  };
}
