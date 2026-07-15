const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json();

  if (!response.ok || payload.ok !== true) {
    throw new Error(payload.error || 'Provider Centre request failed');
  }

  return payload.result;
}

export function getProviderCentre() {
  return request('/api/product-proof/providers');
}

export function getStaffologyEmployers() {
  return request('/api/product-proof/providers/staffology/employers');
}

export function getWorkspaceClients() {
  return request('/api/product-proof/workspace')
    .then((workspace) => workspace.clients || []);
}

export function linkStaffologyEmployer(input) {
  return request(
    '/api/product-proof/providers/staffology/employers/link',
    {
      method: 'POST',
      body: JSON.stringify(input),
    }
  );
}
