const EMPLOYMENT_STATUSES = Object.freeze(['draft','current','on_hold','leaver','archived']);
function createEmployment(input = {}) {
  const status = input.status || 'draft';
  if (!EMPLOYMENT_STATUSES.includes(status)) throw new Error(`Unsupported employment status: ${status}`);
  return Object.freeze({
    status, payrollCode: input.payrollCode || null, jobTitle: input.jobTitle || null,
    department: input.department || null, costCentre: input.costCentre || null,
    startDate: input.startDate || null, continuousEmploymentDate: input.continuousEmploymentDate || null,
    leavingDate: input.leavingDate || null, leavingReason: input.leavingReason || null,
    isDirector: input.isDirector === true, isCisSubcontractor: input.isCisSubcontractor === true,
  });
}
module.exports = { EMPLOYMENT_STATUSES, createEmployment };
