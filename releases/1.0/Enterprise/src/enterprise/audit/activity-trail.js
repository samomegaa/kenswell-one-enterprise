const activityTrail = [];

function recordActivity(auditContext) {
  if (!auditContext || typeof auditContext !== 'object') {
    throw new Error('auditContext is required');
  }

  activityTrail.push(auditContext);
  return auditContext;
}

function queryActivity(predicate = () => true) {
  return activityTrail.filter(predicate);
}

function findByRequest(requestId) {
  return queryActivity((entry) => entry.requestId === requestId);
}

function findByCorrelation(correlationId) {
  return queryActivity((entry) => entry.correlationId === correlationId);
}

function findByActor(actorId) {
  return queryActivity((entry) => entry.actorId === actorId);
}

function findByEntity(entity, entityId) {
  return queryActivity((entry) => {
    if (entityId) {
      return entry.entity === entity && entry.entityId === entityId;
    }

    return entry.entity === entity;
  });
}

function clearActivityTrail() {
  activityTrail.length = 0;
}

module.exports = {
  recordActivity,
  queryActivity,
  findByRequest,
  findByCorrelation,
  findByActor,
  findByEntity,
  clearActivityTrail,
};
