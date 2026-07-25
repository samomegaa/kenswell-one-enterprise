export const OPTIMISATION_STATUS = Object.freeze({
  READY: 'ready',
  REVIEW_REQUIRED: 'review-required',
  BLOCKED: 'blocked',
});

export const OPTIMISATION_ACTION = Object.freeze({
  REBALANCE_QUEUE: 'rebalance-queue',
  PRIORITISE_WORK: 'prioritise-work',
  REDUCE_RETRIES: 'reduce-retries',
  REQUEST_APPROVAL: 'request-approval',
  OBSERVE: 'observe',
});
