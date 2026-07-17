function createPayrollProfile(input = {}) {
  return Object.freeze({
    payFrequency: input.payFrequency || null, payScheduleName: input.payScheduleName || null,
    paymentMethod: input.paymentMethod || null, salary: input.salary ?? null, hourlyRate: input.hourlyRate ?? null,
    normalHours: input.normalHours ?? null, basicPay: input.basicPay ?? null, currency: input.currency || 'GBP',
  });
}
module.exports = { createPayrollProfile };
