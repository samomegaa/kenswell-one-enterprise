import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
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
        <DataList
          items={messages}
          emptyTitle="No messages yet"
          emptyMessage="Secure messages from your legal team will appear here."
          getTitle={(message) => message.subject || 'Secure message'}
          getStatus={(message) => message.status}
          getMeta={(message) => message.senderType ? `From ${message.senderType}` : 'Message'}
        />
      </section>
    </>
  );
}
