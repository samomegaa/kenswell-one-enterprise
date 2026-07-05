const API_BASE_URL =
  import.meta.env.VITE_CLIENT_PORTAL_API_URL || '/api/client-portal';

function getToken() {
  return localStorage.getItem('kenswell_client_portal_token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data?.error?.message || 'Request failed');
  }

  return data;
}

export const clientPortalApi = {
  login(payload) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  activate(payload) {
    return request('/auth/activate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  dashboard() {
    return request('/portal/dashboard');
  },

  documents() {
    return request('/documents');
  },

  messages() {
    return request('/messages');
  },

  tasks() {
    return request('/tasks');
  },

  approvals() {
    return request('/approvals');
  },

  activity() {
    return request('/activity');
  },
};
