const KEY = 'kenswell.payroll.command-history';

export function readCommandHistory() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function writeCommandHistory(commands) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(commands.slice(0, 100))
    );
  } catch {
    // Command Centre remains available without persistence.
  }
}
