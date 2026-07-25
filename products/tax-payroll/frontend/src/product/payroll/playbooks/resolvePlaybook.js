import {
  RECOVERY_PLAYBOOKS,
} from './recoveryPlaybooks';

export function resolvePlaybook(ruleId) {
  return RECOVERY_PLAYBOOKS[ruleId] || null;
}
