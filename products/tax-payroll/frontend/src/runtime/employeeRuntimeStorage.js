const STORAGE_PREFIX =
  'kenswell.enterprise.selectedEmployeeId';

function buildStorageKey(employerId) {
  return `${STORAGE_PREFIX}:${employerId}`;
}

export function readSelectedEmployeeId(employerId) {
  if (!employerId) {
    return null;
  }

  try {
    return window.localStorage.getItem(
      buildStorageKey(employerId)
    );
  } catch {
    return null;
  }
}

export function writeSelectedEmployeeId(
  employerId,
  employeeId
) {
  if (!employerId) {
    return;
  }

  try {
    const key = buildStorageKey(employerId);

    if (employeeId) {
      window.localStorage.setItem(key, employeeId);
      return;
    }

    window.localStorage.removeItem(key);
  } catch {
    // Runtime selection remains available in memory.
  }
}
