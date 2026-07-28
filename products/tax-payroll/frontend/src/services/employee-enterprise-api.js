const API_BASE_URL = (
  import.meta.env?.VITE_API_BASE_URL || ''
).replace(/\/+$/, '');

export class EmployeeEnterpriseApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'EmployeeEnterpriseApiError';
    this.code = options.code || 'EMPLOYEE_API_ERROR';
    this.status = options.status || 500;
    this.details = options.details || null;
  }
}

function endpoint(pathname) {
  return `${API_BASE_URL}${pathname}`;
}

async function request(pathname) {
  const response = await fetch(endpoint(pathname), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.ok !== true) {
    throw new EmployeeEnterpriseApiError(
      payload?.error?.message ||
        `Employee request failed with ${response.status}`,
      {
        code: payload?.error?.code,
        status: response.status,
        details: payload?.error?.details,
      }
    );
  }

  return payload.data;
}

function addQueryValue(params, name, value) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  params.set(name, String(value));
}

export function listEnterpriseEmployees() {
  return request('/api/enterprise/employees');
}

export function queryEnterpriseEmployees(query = {}) {
  const params = new URLSearchParams();

  for (const name of [
    'search',
    'status',
    'payrollCode',
    'payPeriod',
    'sortBy',
    'sortDirection',
    'page',
    'pageSize',
  ]) {
    addQueryValue(params, name, query[name]);
  }

  const suffix = params.toString();
  const pathname = suffix
    ? `/api/enterprise/employees/query?${suffix}`
    : '/api/enterprise/employees/query';

  return request(pathname);
}

export function getEnterpriseEmployeeContext() {
  return request('/api/enterprise/employees/context');
}

export function getEnterpriseEmployee(employeeRef) {
  if (!employeeRef) {
    throw new EmployeeEnterpriseApiError(
      'Employee reference is required',
      {
        code: 'EMPLOYEE_REFERENCE_REQUIRED',
        status: 400,
      }
    );
  }

  return request(
    `/api/enterprise/employees/${encodeURIComponent(
      employeeRef
    )}`
  );
}
