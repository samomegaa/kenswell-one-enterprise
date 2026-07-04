import {
  evaluateDeadline,
  applyEscalation,
  shouldEscalate,
  createEscalationNotice,
  createBreachFromDeadline,
  DeadlineStatus
} from '../index.js';

export function monitorDeadlines(deadlines = [], options = {}) {
  const now = options.now || new Date().toISOString();

  const evaluated = deadlines.map(deadline => {
    const checked = evaluateDeadline(deadline, now);
    return applyEscalation(checked, now);
  });

  const escalations = evaluated
    .filter(shouldEscalate)
    .map(createEscalationNotice);

  const breaches = evaluated
    .filter(deadline => deadline.status === DeadlineStatus.OVERDUE)
    .map(deadline => createBreachFromDeadline(deadline, 'Deadline monitor detected SLA breach'));

  return {
    checkedAt: now,
    total: deadlines.length,
    evaluated,
    escalations,
    breaches
  };
}
