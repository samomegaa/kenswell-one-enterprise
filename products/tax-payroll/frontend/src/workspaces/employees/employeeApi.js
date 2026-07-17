const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    throw new Error(payload?.errors?.[0]?.message || `Employee request failed (${response.status})`);
  }
  return payload.data;
}

export function getEmployee(employeeId) {
  return request(`/api/employees/${encodeURIComponent(employeeId)}`);
}
