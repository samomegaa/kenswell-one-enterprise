import {
  createDeadline,
  DeadlineStatus,
  monitorDeadlines
} from '../index.js';

const deadlines = [
  createDeadline({
    executionId: 'execution_001',
    stepKey: 'director_approval',
    dueAt: '2026-07-04T10:00:00.000Z'
  }),
  createDeadline({
    executionId: 'execution_002',
    stepKey: 'client_information',
    dueAt: '2026-07-04T13:00:00.000Z'
  }),
  createDeadline({
    executionId: 'execution_003',
    stepKey: 'hmrc_filing',
    dueAt: '2026-07-04T09:00:00.000Z',
    status: DeadlineStatus.MET
  })
];

const result = monitorDeadlines(deadlines, {
  now: '2026-07-04T12:30:00.000Z'
});

console.log('TOTAL', result.total);
console.log('EVALUATED', result.evaluated.length);
console.log('ESCALATIONS', result.escalations.length);
console.log('BREACHES', result.breaches.length);
console.log('FIRST_STATUS', result.evaluated[0].status);
console.log('SECOND_STATUS', result.evaluated[1].status);
console.log('THIRD_STATUS', result.evaluated[2].status);
