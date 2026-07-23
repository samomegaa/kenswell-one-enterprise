export const PAYROLL_APPROVAL_CONTRACT = Object.freeze({
  objectKeys: Object.freeze([
    'approval',
    'approvalStatus',
    'workflow',
    'approvalWorkflow',
  ]),
  historyKeys: Object.freeze([
    'history',
    'approvalHistory',
    'events',
    'timeline',
  ]),
  blockerKeys: Object.freeze([
    'blockers',
    'blockingIssues',
    'approvalBlockers',
  ]),
  requirementKeys: Object.freeze([
    'requirements',
    'requiredApprovals',
    'approvers',
  ]),
  fields: Object.freeze({
    status: Object.freeze(['status', 'approvalStatus', 'state', 'stage']),
    readyForApproval: Object.freeze(['readyForApproval', 'canApprove', 'approvalReady']),
    readyForSubmission: Object.freeze(['readyForSubmission', 'canSubmit', 'submissionReady']),
    validationPassed: Object.freeze(['validationPassed', 'validationsPassed', 'validationGatePassed']),
    approvedBy: Object.freeze(['approvedBy', 'approver', 'actor', 'userName']),
    approvedAt: Object.freeze(['approvedAt', 'approvalDate', 'timestamp', 'createdAt']),
  }),
});
