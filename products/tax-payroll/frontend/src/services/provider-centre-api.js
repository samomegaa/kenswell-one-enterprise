const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  '';

async function request(path) {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  const payload = await response.json();

  if (!response.ok || payload.ok !== true) {
    throw new Error(
      payload.error ||
      'Provider Centre request failed'
    );
  }

  return payload.result;
}

export function getProviderCentre() {
  return request(
    '/api/product-proof/providers'
  );
}

export function getStaffologyEmployers() {
  return request(
    '/api/product-proof/providers/' +
    'staffology/employers'
  );
}
