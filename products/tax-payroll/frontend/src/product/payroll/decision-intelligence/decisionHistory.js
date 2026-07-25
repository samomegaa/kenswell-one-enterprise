const KEY = 'kenswell.payroll.decision-history';

export function readDecisionHistory() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function writeDecisionHistory(decisions) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(decisions.slice(0, 100))
    );
  } catch {
    // Decision Centre remains available without persistence.
  }
}
