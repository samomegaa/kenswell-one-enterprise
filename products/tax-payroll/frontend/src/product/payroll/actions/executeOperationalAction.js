import { archiveCompletedPayroll } from './archiveCompletedPayroll';
import { refreshOperationalState } from './refreshOperationalState';
import { rerunValidation } from './rerunValidation';
import { restartPipeline } from './restartPipeline';
import { retrySubmission } from './retrySubmission';

const handlers = Object.freeze({
  'retry-submission': retrySubmission,
  'restart-pipeline': restartPipeline,
  'rerun-validation': rerunValidation,
  'refresh-operational-state': refreshOperationalState,
  'archive-completed-payroll': archiveCompletedPayroll,
});

export async function executeOperationalAction(type, context) {
  const handler = handlers[type];

  if (!handler) {
    throw new Error(`Unknown operational command: ${type}`);
  }

  return handler(context);
}
