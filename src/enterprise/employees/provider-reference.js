function createProviderReference(input = {}) {
  return Object.freeze({ provider: input.provider || null, externalEmployeeId: input.externalEmployeeId || null, externalEmployerId: input.externalEmployerId || null, providerUrl: input.providerUrl || null, providerVersion: input.providerVersion || null, lastSynchronisedAt: input.lastSynchronisedAt || null });
}
module.exports = { createProviderReference };
