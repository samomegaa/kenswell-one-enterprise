export function recordDecisionAudit(
  enterpriseAdapter,
  decision
) {
  enterpriseAdapter?.publishEvent?.(
    'EnterpriseDecisionProposed',
    decision
  );

  enterpriseAdapter?.writeAudit?.({
    action: 'EnterpriseDecisionProposed',
    decisionId: decision.id,
    strategy: decision.strategy,
    risk: decision.risk,
    confidence: decision.confidence,
    recordedAt: new Date().toISOString(),
  });
}
