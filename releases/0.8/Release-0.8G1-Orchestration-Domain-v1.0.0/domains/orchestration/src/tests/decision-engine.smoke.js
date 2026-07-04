import {
  createOrchestrationDecision,
  evaluateOrchestrationDecision,
  evaluateOrchestrationDecisions
} from '../index.js';

const decision = createOrchestrationDecision({
  field: 'payload.documentType',
  value: 'CORPORATION_TAX_RETURN',
  trueStepKey: 'start_workflow',
  falseStepKey: 'stop'
});

const context = {
  payload: {
    documentType: 'CORPORATION_TAX_RETURN'
  }
};

const result = evaluateOrchestrationDecision(decision, context);
const results = evaluateOrchestrationDecisions([decision], context);

console.log('MATCHED', result.matched);
console.log('NEXT_STEP', result.nextStepKey);
console.log('DECISIONS', results.length);
