const KEY = 'kenswell.payroll.self-healing-history';

export function readSelfHealingHistory() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function writeSelfHealingHistory(items) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(items.slice(0, 100))
    );
  } catch {
    // Recovery planning remains available without persistence.
  }
}
