export async function dispatchExecutionJob(job, providerAdapter) {
  if (!providerAdapter?.executePayrollJob) {
    return { delegated: false, jobId: job.id, message: 'Provider adapter awaiting connection' };
  }
  return providerAdapter.executePayrollJob({
    jobId: job.id, type: job.type, payload: job.payload,
  });
}
