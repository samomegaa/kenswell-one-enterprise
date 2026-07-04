import {
  createSLAPolicy,
  createDeadline,
  createSLABreach,
  SLAStatus,
  DeadlineStatus,
  EscalationLevel
} from '../index.js';

const policy = createSLAPolicy({
  key: 'director_approval_48h',
  name: 'Director Approval 48 Hours',
  status: SLAStatus.ACTIVE,
  targetMinutes: 2880,
  warningMinutes: 1440,
  escalationMinutes: 2160,
  criticalMinutes: 2880
});

const deadline = createDeadline({
  executionId: 'execution_001',
  stepKey: 'director_approval',
  dueAt: '2026-07-06T10:00:00.000Z',
  status: DeadlineStatus.UPCOMING,
  escalationLevel: EscalationLevel.NONE
});

const breach = createSLABreach({
  executionId: 'execution_001',
  deadlineId: deadline.id,
  stepKey: 'director_approval',
  reason: 'Director approval exceeded 48 hours'
});

console.log('SLA', policy.name);
console.log('TARGET_MINUTES', policy.targetMinutes);
console.log('DEADLINE_STATUS', deadline.status);
console.log('ESCALATION', deadline.escalationLevel);
console.log('BREACH_REASON', breach.reason);
