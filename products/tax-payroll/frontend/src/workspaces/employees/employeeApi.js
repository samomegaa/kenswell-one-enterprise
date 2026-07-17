const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const payload = await response.json();

  if (!response.ok || payload.success === false) {
    throw new Error(
      payload?.errors?.[0]?.message ||
        payload?.message ||
        `Employee request failed (${response.status})`
    );
  }

  return payload.data;
}

export function getEmployee(employeeId) {
  return request(`/api/employees/${encodeURIComponent(employeeId)}`);
}

export function createEmployee(employee) {
  return request('/api/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  });
}

export function updateEmployee(employeeId, employee) {
  return request(`/api/employees/${encodeURIComponent(employeeId)}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  });
}
