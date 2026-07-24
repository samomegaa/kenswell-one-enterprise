export function createExecutionResult({ job, status, value = null, error = null }) {
  return Object.freeze({
    jobId: job.id, type: job.type, status, value,
    error: error ? String(error.message || error) : null,
    completedAt: new Date().toISOString(),
  });
}
