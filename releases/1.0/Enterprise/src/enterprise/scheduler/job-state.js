const JobState = Object.freeze({
  REGISTERED: 'registered',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
});

const JobType = Object.freeze({
  ONCE: 'once',
  RECURRING: 'recurring',
  DELAYED: 'delayed',
  STARTUP: 'startup',
  MANUAL: 'manual',
});

module.exports = {
  JobState,
  JobType,
};
