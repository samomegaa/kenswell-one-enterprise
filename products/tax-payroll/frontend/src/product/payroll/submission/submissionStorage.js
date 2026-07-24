const KEY = 'kenswell.payroll.submission';

export function readSubmissionState() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writeSubmissionState(state) {
  try {
    if (!state) {
      window.localStorage.removeItem(KEY);
      return;
    }

    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Submission UI remains functional without persistence.
  }
}
