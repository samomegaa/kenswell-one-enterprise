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
    const message =
      typeof data.error === 'string'
        ? data.error
        : data?.error?.message || 'Request failed';

    throw new Error(message);
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

  sendMessage(payload) {
    return request('/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  markMessageRead(messageId) {
    return request(`/messages/${messageId}/read`, {
      method: 'PATCH',
      body: JSON.stringify({}),
    });
  },

  tasks() {
    return request('/tasks');
  },

  completeTask(taskId) {
    return request(`/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({}),
    });
  },

  approvals() {
    return request('/approvals');
  },

  approveRequest(approvalId, payload = {}) {
    return request(`/approvals/${approvalId}/approve`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  rejectRequest(approvalId, payload = {}) {
    return request(`/approvals/${approvalId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  activity() {
    return request('/activity');
  },

  prepareUpload(payload) {
    return request('/files/prepare-upload', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  confirmUpload(fileAssetId, payload = {}) {
    return request(`/files/${fileAssetId}/confirm`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
};
