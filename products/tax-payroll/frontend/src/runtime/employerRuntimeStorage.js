const STORAGE_KEY =
  'kenswell.enterprise.selectedEmployerId';

export function readSelectedEmployerId() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeSelectedEmployerId(employerId) {
  try {
    if (employerId) {
      window.localStorage.setItem(
        STORAGE_KEY,
        employerId
      );
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Runtime selection remains available in memory.
  }
}
