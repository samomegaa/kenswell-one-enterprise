import { createExecutionResult } from './createExecutionResult';
import { dispatchExecutionJob } from './dispatchExecutionJob';

export async function executePayrollJob(job, providerAdapter) {
  try {
    const value = await dispatchExecutionJob(job, providerAdapter);
    return createExecutionResult({ job, status: 'succeeded', value });
  } catch (error) {
    return createExecutionResult({ job, status: 'failed', error });
  }
}
