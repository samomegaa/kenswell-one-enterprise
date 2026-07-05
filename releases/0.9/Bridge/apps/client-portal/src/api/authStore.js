const TOKEN_KEY = 'kenswell_client_portal_token';
const ACCOUNT_KEY = 'kenswell_client_portal_account';

export function saveSession(session) {
  localStorage.setItem(TOKEN_KEY, session.accessToken);
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(session.account || {}));
}

export function getSession() {
  return {
    token: localStorage.getItem(TOKEN_KEY),
    account: JSON.parse(localStorage.getItem(ACCOUNT_KEY) || 'null'),
  };
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACCOUNT_KEY);
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}
