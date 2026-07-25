import {
  OPERATIONAL_RUNBOOKS,
} from './runbookRegistry';

export function resolveOperationalRunbook(runbookId) {
  return OPERATIONAL_RUNBOOKS.find(
    (runbook) => runbook.id === runbookId
  ) || null;
}
