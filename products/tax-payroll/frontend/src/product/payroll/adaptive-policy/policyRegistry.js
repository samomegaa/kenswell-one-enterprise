export const ADAPTIVE_POLICIES = Object.freeze([
  {
    id: 'rejected-submission-recovery',
    label: 'Rejected submission recovery',
    priority: 100,
    when: 'submission-rejected',
    outcome: 'require-approval',
    strategy: 'recover',
  },
  {
    id: 'retry-limit-escalation',
    label: 'Retry limit escalation',
    priority: 90,
    when: 'retry-limit-reached',
    outcome: 'block',
    strategy: 'escalate',
  },
  {
    id: 'sla-breach-escalation',
    label: 'SLA breach escalation',
    priority: 80,
    when: 'sla-breached',
    outcome: 'advise',
    strategy: 'escalate',
  },
  {
    id: 'healthy-completion-archive',
    label: 'Healthy completion archive',
    priority: 60,
    when: 'completion-ready',
    outcome: 'require-approval',
    strategy: 'archive',
  },
]);
