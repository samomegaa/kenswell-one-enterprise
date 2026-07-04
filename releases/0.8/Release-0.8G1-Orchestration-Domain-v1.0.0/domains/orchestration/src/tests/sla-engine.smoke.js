import {
  createSLAPolicy,
  createDeadlineFromPolicy,
  evaluateDeadline,
  createBreachFromDeadline
} from '../index.js';

const policy = createSLAPolicy({
  key: 'approval_60_minutes',
  name: 'Approval 60 Minutes',
  targetMinutes: 60
});

const execution = {
  id: 'execution_001',
  startedAt: '2026-07-04T10:00:00.000Z'
};

const deadline = createDeadlineFromPolicy({
  execution,
  stepKey: 'director_approval',
  policy
});

const upcoming = evaluateDeadline(deadline, '2026-07-04T10:30:00.000Z');
const dueSoon = evaluateDeadline(deadline, '2026-07-04T10:59:00.000Z');
const overdue = evaluateDeadline(deadline, '2026-07-04T11:01:00.000Z');
const breach = createBreachFromDeadline(overdue, 'Approval exceeded 60 minutes');

console.log('DUE_AT', deadline.dueAt);
console.log('UPCOMING', upcoming.status);
console.log('DUE_SOON', dueSoon.status);
console.log('OVERDUE', overdue.status);
console.log('ESCALATION', overdue.escalationLevel);
console.log('BREACH', breach.severity);
