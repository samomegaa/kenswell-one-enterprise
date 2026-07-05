import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

export default function MessagesPage() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.messages()
      .then((data) => setMessages(data.messages || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!messages) return <LoadingState label="Loading messages..." />;

  return (
    <>
      <PageHeader title="Secure Messages" subtitle="Matter-based secure communication." />
      <section className="panel">
        {messages.length === 0 ? <p>No messages yet.</p> : (
          <ul className="simple-list">
            {messages.map((message) => (
              <li key={message.id}><strong>{message.subject || 'Secure message'}</strong><span>{message.status}</span></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
