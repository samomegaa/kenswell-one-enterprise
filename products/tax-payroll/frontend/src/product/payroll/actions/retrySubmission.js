export async function retrySubmission(context) {
  if (!context?.submission?.retry) {
    throw new Error('Submission retry action unavailable');
  }

  await context.submission.retry();

  return Object.freeze({
    message: 'Submission retry queued',
  });
}
