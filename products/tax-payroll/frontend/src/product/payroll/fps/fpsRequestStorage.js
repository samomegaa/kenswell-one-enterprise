const KEY = 'kenswell.payroll.fps-request';

export function readFpsRequest() {
  try {
    const value = window.localStorage.getItem(KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writeFpsRequest(request) {
  try {
    if (!request) {
      window.localStorage.removeItem(KEY);
      return;
    }

    window.localStorage.setItem(KEY, JSON.stringify(request));
  } catch {
    // FPS preparation remains available without persistence.
  }
}
