'use strict';

const READINESS_LEVELS = Object.freeze({
  CREATION: 'creation',
  PAYROLL: 'payroll',
  RTI: 'rti',
});

const READINESS_STATUSES = Object.freeze({
  READY: 'ready',
  INCOMPLETE: 'incomplete',
  BLOCKED: 'blocked',
  NOT_APPLICABLE: 'not-applicable',
});

const READINESS_LEVEL_LIST = Object.freeze(
  Object.values(READINESS_LEVELS)
);

module.exports = {
  READINESS_LEVELS,
  READINESS_STATUSES,
  READINESS_LEVEL_LIST,
};
