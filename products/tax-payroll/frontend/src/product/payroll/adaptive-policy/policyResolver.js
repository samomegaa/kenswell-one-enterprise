export function resolvePolicies(evidence, policies) {
  const signals = new Set(evidence.signals || []);

  return policies
    .filter((policy) => signals.has(policy.when))
    .sort((left, right) => right.priority - left.priority);
}
