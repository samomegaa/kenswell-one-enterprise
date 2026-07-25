const KEY = 'kenswell.payroll.optimisation-history';

export function readOptimisationHistory() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function writeOptimisationHistory(items) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(items.slice(0, 100))
    );
  } catch {
    // Centre remains available without local persistence.
  }
}
