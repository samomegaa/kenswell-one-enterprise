const STORAGE_KEY = 'kenswell.payroll.execution';

export function readPayrollExecution() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writePayrollExecution(execution) {
  try {
    if (!execution) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(execution)
    );
  } catch {
    // Persistence must never block payroll processing UI.
  }
}
