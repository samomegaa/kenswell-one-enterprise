import {
  displayApprovalBoolean,
  displayApprovalDate,
  displayApprovalValue,
} from './payrollApprovalPresentation';

export function createPayrollApprovalPresentationModel(contract) {
  return {
    available: contract.available,
    source: contract.source,
    status: displayApprovalValue(contract.status),
    gates: [
      { label: 'Approval readiness', value: displayApprovalBoolean(contract.readyForApproval) },
      { label: 'Submission readiness', value: displayApprovalBoolean(contract.readyForSubmission) },
      { label: 'Validation gate', value: displayApprovalBoolean(contract.validationPassed) },
    ],
    approvedBy: displayApprovalValue(contract.approvedBy),
    approvedAt: displayApprovalDate(contract.approvedAt),
    blockers: contract.blockers,
    requirements: contract.requirements,
    history: contract.history.map((entry) => ({
      ...entry,
      actorLabel: displayApprovalValue(entry.actor),
      timestampLabel: displayApprovalDate(entry.timestamp),
    })),
  };
}
