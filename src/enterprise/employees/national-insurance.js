function createNationalInsurance(input = {}) {
  return Object.freeze({ number: input.number || null, category: input.category || null, directorCalculationMethod: input.directorCalculationMethod || null, verificationStatus: input.verificationStatus || 'unverified' });
}
module.exports = { createNationalInsurance };
