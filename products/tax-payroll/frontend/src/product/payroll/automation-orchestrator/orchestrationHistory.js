const KEY = 'kenswell.payroll.orchestration-history';

export function readOrchestrationHistory() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function writeOrchestrationHistory(items) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(items.slice(0, 100))
    );
  } catch {
    // Orchestrator remains functional without browser persistence.
  }
}
