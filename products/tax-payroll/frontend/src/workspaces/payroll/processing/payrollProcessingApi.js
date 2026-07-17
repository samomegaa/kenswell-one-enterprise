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
        `Payroll processing request failed (${response.status})`
    );
  }

  return payload.data;
}

export function createPayrollRun(payload) {
  return request('/api/payroll-runs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function validatePayrollRun(runId) {
  return request(`/api/payroll-runs/${encodeURIComponent(runId)}/validate`, {
    method: 'POST',
  });
}

export function previewPayrollRun(runId) {
  return request(`/api/payroll-runs/${encodeURIComponent(runId)}/preview`);
}

export function approvePayrollRun(runId, expectedVersion) {
  return request(`/api/payroll-runs/${encodeURIComponent(runId)}/approve`, {
    method: 'POST',
    body: JSON.stringify({ expectedVersion }),
  });
}

export function processPayrollRun(runId, expectedVersion) {
  return request(`/api/payroll-runs/${encodeURIComponent(runId)}/process`, {
    method: 'POST',
    body: JSON.stringify({ expectedVersion }),
  });
}
