import {
  createDeadline,
  DeadlineStatus,
  EscalationLevel,
  applyEscalation,
  shouldEscalate,
  createEscalationNotice
} from '../index.js';

const deadline = createDeadline({
  executionId: 'execution_001',
  stepKey: 'director_approval',
  dueAt: '2026-07-04T11:00:00.000Z',
  status: DeadlineStatus.OVERDUE,
  escalationLevel: EscalationLevel.NONE
});

const escalated = applyEscalation(deadline, '2026-07-04T12:00:00.000Z');
const notice = createEscalationNotice(escalated);

console.log('STATUS', escalated.status);
console.log('ESCALATION', escalated.escalationLevel);
console.log('SHOULD_ESCALATE', shouldEscalate(escalated));
console.log('NOTICE_LEVEL', notice.level);
console.log('NOTICE_STEP', notice.stepKey);
