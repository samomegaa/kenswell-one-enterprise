export function evaluateCommandEligibility(type, snapshot) {
  const submission = snapshot?.submission;
  const completion = snapshot?.completion?.completion;

  switch (type) {
    case 'retry-submission':
      return result(
        ['failed', 'rejected'].includes(submission?.status),
        'Failed or rejected submission required'
      );
    case 'restart-pipeline':
      return result(
        ['failed', 'cancelled'].includes(snapshot?.pipeline?.status),
        'Failed or cancelled pipeline required'
      );
    case 'archive-completed-payroll':
      return result(
        completion?.status === 'completed',
        'Completed payroll required'
      );
    default:
      return result(true, 'Command available');
  }
}

function result(eligible, reason) {
  return Object.freeze({ eligible, reason });
}
