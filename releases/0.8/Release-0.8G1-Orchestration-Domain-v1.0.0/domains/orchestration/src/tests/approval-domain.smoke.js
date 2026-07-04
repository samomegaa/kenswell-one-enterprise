import {
  createApprovalRequest,
  createWaitState,
  WaitStateType
} from '../index.js';

const approval = createApprovalRequest({
  executionId: 'execution_001',
  stepKey: 'director_approval',
  requestedFrom: 'director_001'
});

const wait = createWaitState({
  executionId: 'execution_001',
  type: WaitStateType.APPROVAL,
  reason: 'Awaiting Director Approval'
});

console.log('APPROVAL', approval.status);
console.log('REQUESTED_FROM', approval.requestedFrom);
console.log('WAIT_TYPE', wait.type);
console.log('WAIT_REASON', wait.reason);
