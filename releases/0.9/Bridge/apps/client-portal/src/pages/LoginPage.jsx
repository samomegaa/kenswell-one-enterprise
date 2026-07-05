import PageHeader from '../components/PageHeader';

export default function LoginPage() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Client Portal Sign In"
          subtitle="Secure access to your matters, documents, messages, tasks and approvals."
        />

        <form>
          <label>
            Email
            <input type="email" placeholder="client@example.com" />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="button">Sign in</button>
        </form>
      </div>
    </section>
  );
}
