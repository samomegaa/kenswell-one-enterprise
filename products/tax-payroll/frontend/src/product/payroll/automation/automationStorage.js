const KEY = 'kenswell.payroll.automation-history';

export function readAutomationHistory() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function writeAutomationHistory(runs) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(runs.slice(0, 100))
    );
  } catch {
    // Automation Centre remains available without persistence.
  }
}
