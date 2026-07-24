const KEY = 'kenswell.payroll.governance';

export function readGovernanceState() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writeGovernanceState(state) {
  try {
    if (!state) {
      window.localStorage.removeItem(KEY);
      return;
    }

    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Governance UI remains available without persistence.
  }
}
