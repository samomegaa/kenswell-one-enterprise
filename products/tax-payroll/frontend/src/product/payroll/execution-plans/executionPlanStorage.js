const KEY = 'kenswell.payroll.execution-plan-history';

export function readExecutionPlanHistory() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function writeExecutionPlanHistory(plans) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(plans.slice(0, 100))
    );
  } catch {
    // Scheduling Centre remains available without persistence.
  }
}
