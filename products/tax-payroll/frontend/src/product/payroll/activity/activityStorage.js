const KEY = 'kenswell.payroll.activity-centre';

export function readActivityHistory() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function writeActivityHistory(entries) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(entries.slice(0, 100))
    );
  } catch {
    // Activity Centre remains available without persistence.
  }
}
