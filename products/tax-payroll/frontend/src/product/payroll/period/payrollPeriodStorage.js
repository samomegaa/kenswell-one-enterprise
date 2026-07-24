const STORAGE_KEY = 'kenswell.payroll.period';

export function readPayrollPeriod() {
  try {
    const value =
      window.localStorage.getItem(STORAGE_KEY);

    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writePayrollPeriod(period) {
  try {
    if (!period) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(period)
    );
  } catch {
    // Persistence must never block payroll UI.
  }
}
