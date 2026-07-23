import {
  resolvePayrollApproval,
  resolvePayrollApprovalField,
} from './payrollApprovalResolver';

function adaptHistoryEntry(entry, index) {
  return {
    id: String(entry?.id || entry?.eventId || `approval-event-${index + 1}`),
    status: entry?.status || entry?.state || entry?.action || 'Unavailable',
    actor: entry?.approvedBy || entry?.actor || entry?.userName || entry?.user || null,
    timestamp: entry?.approvedAt || entry?.timestamp || entry?.createdAt || null,
  };
}

function adaptListItem(item, index, prefix) {
  if (typeof item === 'string') return { id: `${prefix}-${index + 1}`, label: item };
  return {
    id: String(item?.id || item?.code || `${prefix}-${index + 1}`),
    label: item?.message || item?.description || item?.name || item?.label || 'Unavailable',
  };
}

export function adaptStaffologyPayrollApproval(employer, payrollRun) {
  const resolved = resolvePayrollApproval(employer, payrollRun);
  const approval = resolved.approval || {};
  const field = (name) => resolvePayrollApprovalField(approval, name);
  return {
    available: resolved.available,
    source: resolved.source,
    status: field('status'),
    readyForApproval: field('readyForApproval'),
    readyForSubmission: field('readyForSubmission'),
    validationPassed: field('validationPassed'),
    approvedBy: field('approvedBy'),
    approvedAt: field('approvedAt'),
    history: resolved.history.map(adaptHistoryEntry),
    blockers: resolved.blockers.map((item, index) => adaptListItem(item, index, 'blocker')),
    requirements: resolved.requirements.map((item, index) => adaptListItem(item, index, 'requirement')),
  };
}
