const STORAGE_KEY = 'kenswell.payroll.session';

export function readPayrollSession() {
  try {
    const value =
      window.localStorage.getItem(STORAGE_KEY);

    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writePayrollSession(session) {
  try {
    if (!session) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const {
      runtimeWorkspace,
      ...serializable
    } = session;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(serializable)
    );
  } catch {
    // Persistence must never block payroll UI.
  }
}
