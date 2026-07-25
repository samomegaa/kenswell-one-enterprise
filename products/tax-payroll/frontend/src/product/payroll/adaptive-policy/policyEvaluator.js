export function evaluatePolicies(policies) {
  const blocking = policies.find(
    (policy) => policy.outcome === 'block'
  );

  if (blocking) {
    return {
      outcome: 'block',
      strategy: blocking.strategy,
      policyId: blocking.id,
    };
  }

  const selected = policies[0];

  return selected
    ? {
        outcome: selected.outcome,
        strategy: selected.strategy,
        policyId: selected.id,
      }
    : {
        outcome: 'advise',
        strategy: 'observe',
        policyId: null,
      };
}
