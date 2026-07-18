'use strict';

const {
  READINESS_STATUSES,
} = require('./readiness-levels');

function calculateScore(completed, required) {
  if (required === 0) {
    return 100;
  }

  return Math.round((completed / required) * 100);
}

function resolveStatus({
  required,
  missing,
  blocked = false,
}) {
  if (required === 0) {
    return READINESS_STATUSES.NOT_APPLICABLE;
  }

  if (blocked) {
    return READINESS_STATUSES.BLOCKED;
  }

  if (missing === 0) {
    return READINESS_STATUSES.READY;
  }

  return READINESS_STATUSES.INCOMPLETE;
}

function createReadinessResult(input = {}) {
  const required = Number(input.required || 0);
  const completed = Number(input.completed || 0);
  const missingFields = Object.freeze([
    ...(input.missingFields || []),
  ]);

  const missing = missingFields.length;

  return Object.freeze({
    level: input.level,
    status: resolveStatus({
      required,
      missing,
      blocked: input.blocked,
    }),
    score: calculateScore(completed, required),
    required,
    completed,
    missing,
    warnings: Object.freeze([
      ...(input.warnings || []),
    ]),
    missingFields,
  });
}

module.exports = {
  calculateScore,
  resolveStatus,
  createReadinessResult,
};
