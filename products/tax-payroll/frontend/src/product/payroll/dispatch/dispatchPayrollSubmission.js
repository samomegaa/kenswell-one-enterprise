export async function dispatchPayrollSubmission({
  submission,
  dispatchRequest,
  providerAdapter,
}) {
  if (!providerAdapter?.submitFps) {
    return Object.freeze({
      ...submission,
      status: 'pending',
      lastResult: 'Provider adapter awaiting connection',
      attempts: submission.attempts + 1,
      updatedAt: new Date().toISOString(),
    });
  }

  try {
    const result = await providerAdapter.submitFps(
      dispatchRequest
    );

    return Object.freeze({
      ...submission,
      status: result?.accepted ? 'accepted' : 'pending',
      providerReference: result?.reference || null,
      lastResult: result || null,
      attempts: submission.attempts + 1,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Object.freeze({
      ...submission,
      status: 'failed',
      lastResult: String(error.message || error),
      attempts: submission.attempts + 1,
      updatedAt: new Date().toISOString(),
    });
  }
}
