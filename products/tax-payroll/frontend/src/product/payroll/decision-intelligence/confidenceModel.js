export function calculateConfidence({
  matchedPolicies,
  evidenceCompleteness,
  conflictCount,
}) {
  const policyStrength = Math.min(
    40,
    matchedPolicies.length * 15
  );

  const completeness = Math.round(
    (evidenceCompleteness || 0) * 50
  );

  const conflictPenalty = conflictCount * 10;

  return Math.max(
    0,
    Math.min(100, policyStrength + completeness - conflictPenalty)
  );
}
