import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { clientPortalApi } from '../api/clientPortalApi';

export default function ActivatePage() {
  const params = new URLSearchParams(window.location.search);
  const [token, setToken] = useState(params.get('token') || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleActivate(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await clientPortalApi.activate({ token, password });
      setMessage('Account activated. You can now sign in.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Activate your portal"
          subtitle="Create your password to activate your Kenswell One client portal access."
        />

        {error ? <p className="form-error">{error}</p> : null}
        {message ? <p className="form-success">{message}</p> : null}

        <form onSubmit={handleActivate}>
          <label>
            Invitation token
            <input value={token} onChange={(e) => setToken(e.target.value)} required />
          </label>

          <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>

          <button type="submit">Activate account</button>
        </form>
      </div>
    </section>
  );
}
