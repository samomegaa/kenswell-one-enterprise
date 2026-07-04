export const SLAStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  BREACHED: 'BREACHED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});

export const DeadlineStatus = Object.freeze({
  UPCOMING: 'UPCOMING',
  DUE_SOON: 'DUE_SOON',
  OVERDUE: 'OVERDUE',
  MET: 'MET'
});

export const EscalationLevel = Object.freeze({
  NONE: 'NONE',
  REMINDER: 'REMINDER',
  WARNING: 'WARNING',
  ESCALATED: 'ESCALATED',
  CRITICAL: 'CRITICAL'
});
