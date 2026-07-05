import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { clientPortalApi } from '../api/clientPortalApi';
import { saveSession } from '../api/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    try {
      const session = await clientPortalApi.login({ email, password });
      saveSession(session);
      window.location.hash = '/dashboard';
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Client Portal Sign In"
          subtitle="Secure access to your matters, documents, messages, tasks and approvals."
        />

        {error ? <p className="form-error">{error}</p> : null}

        <form onSubmit={handleLogin}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label>
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </section>
  );
}
