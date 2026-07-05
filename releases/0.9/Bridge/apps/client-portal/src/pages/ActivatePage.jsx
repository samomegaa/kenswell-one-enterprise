import PageHeader from '../components/PageHeader';

export default function ActivatePage() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <PageHeader
          title="Activate your portal"
          subtitle="Create your password to activate your Kenswell One client portal access."
        />

        <form>
          <label>
            Invitation token
            <input type="text" placeholder="Invitation token" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Minimum 8 characters" />
          </label>

          <button type="button">Activate account</button>
        </form>
      </div>
    </section>
  );
}
