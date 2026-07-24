export function canRetrySubmission(submission) {
  return (
    ['failed', 'rejected'].includes(submission?.status) &&
    Number(submission?.attempts || 0) < 3
  );
}
