import { ADAPTIVE_POLICIES } from './policyRegistry';
import { evaluatePolicies } from './policyEvaluator';
import { resolvePolicies } from './policyResolver';

export function runAdaptivePolicyRuntime(evidence) {
  const matched = resolvePolicies(
    evidence,
    ADAPTIVE_POLICIES
  );

  return Object.freeze({
    matched,
    decision: evaluatePolicies(matched),
    evaluatedAt: new Date().toISOString(),
  });
}
