function createPensionProfile(input = {}) {
  return Object.freeze({ autoEnrolmentStatus: input.autoEnrolmentStatus || 'not_assessed', workerCategory: input.workerCategory || null, schemeId: input.schemeId || null, postponementEndDate: input.postponementEndDate || null, employeeContribution: input.employeeContribution ?? null, employerContribution: input.employerContribution ?? null });
}
module.exports = { createPensionProfile };
