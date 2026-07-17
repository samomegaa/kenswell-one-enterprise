function createLeaveProfile(input = {}) {
  return Object.freeze({ holidayAllowance: input.holidayAllowance ?? null, holidayTaken: input.holidayTaken ?? 0, holidayRemaining: input.holidayRemaining ?? null, workingPattern: input.workingPattern || null, sicknessOpen: input.sicknessOpen === true, statutoryLeaveType: input.statutoryLeaveType || null });
}
module.exports = { createLeaveProfile };
