import { runAdaptivePolicyRuntime } from '../adaptive-policy';
import { calculateConfidence } from './confidenceModel';
import { assessDecisionReadiness } from './readinessAssessment';
import { calculateRisk } from './riskCalculator';
import { selectStrategy } from './strategySelector';

export function createEnterpriseDecision(evidence) {
  const policyRuntime = runAdaptivePolicyRuntime(evidence);
  const risk = calculateRisk(evidence);

  const confidence = calculateConfidence({
    matchedPolicies: policyRuntime.matched,
    evidenceCompleteness:
      evidence.completeness ?? 0.8,
    conflictCount: evidence.policyConflicts || 0,
  });

  const readiness = assessDecisionReadiness({
    policyOutcome: policyRuntime.decision.outcome,
    confidence,
    risk,
  });

  const strategy = selectStrategy({
    policyDecision: policyRuntime.decision,
    readiness,
    risk,
  });

  return Object.freeze({
    id: crypto.randomUUID(),
    strategy,
    risk,
    confidence,
    readiness,
    policyRuntime,
    evidence,
    status:
      policyRuntime.decision.outcome === 'require-approval'
        ? 'approval-required'
        : readiness.ready
          ? 'proposed'
          : 'blocked',
    createdAt: new Date().toISOString(),
  });
}
