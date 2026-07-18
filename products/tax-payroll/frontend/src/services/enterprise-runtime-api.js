const DEFAULT_API_BASE_URL =
  'https://api.kenswelloneenterprise.com';

function resolveApiBaseUrl() {
  const configured =
    import.meta.env.VITE_API_BASE_URL?.trim();

  return (configured || DEFAULT_API_BASE_URL)
    .replace(/\/+$/, '');
}

async function request(pathname, options = {}) {
  const response = await fetch(
    `${resolveApiBaseUrl()}${pathname}`,
    {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      `Request failed with status ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload?.data ?? payload;
}

export function listEmployers({ refresh = false } = {}) {
  const query = refresh ? '?refresh=true' : '';

  return request(`/api/employers${query}`);
}

export function getEmployer(employerId) {
  return request(
    `/api/employers/${encodeURIComponent(employerId)}`
  );
}

export function listEmployerEmployees(employerId) {
  return request(
    `/api/employers/${encodeURIComponent(
      employerId
    )}/employees`
  );
}

export function getEmployerEmployee(
  employerId,
  employeeId
) {
  return request(
    `/api/employers/${encodeURIComponent(
      employerId
    )}/employees/${encodeURIComponent(employeeId)}`
  );
}

export function getEmployerEmployeeWorkspace(
  employerId,
  employeeId
) {
  return request(
    `/api/employers/${encodeURIComponent(
      employerId
    )}/employees/${encodeURIComponent(
      employeeId
    )}/workspace`
  );
}

export const enterpriseRuntimeApi = Object.freeze({
  listEmployers,
  getEmployer,
  listEmployerEmployees,
  getEmployerEmployee,
  getEmployerEmployeeWorkspace,
});
