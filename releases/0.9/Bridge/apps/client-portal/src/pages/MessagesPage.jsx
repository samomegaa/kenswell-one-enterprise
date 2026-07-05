import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
import ActionNotice from '../components/ActionNotice';
import { clientPortalApi } from '../api/clientPortalApi';

export default function MessagesPage() {
  const [messages, setMessages] = useState(null);
  const [matterId, setMatterId] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  function loadMessages() {
    return clientPortalApi.messages()
      .then((data) => setMessages(data.messages || []))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleSend(event) {
    event.preventDefault();
    setNotice('');
    setError('');

    try {
      await clientPortalApi.sendMessage({ matterId, subject, body });
      setMatterId('');
      setSubject('');
      setBody('');
      setNotice('Message sent.');
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!messages && error) return <ErrorState message={error} />;
  if (!messages) return <LoadingState label="Loading messages..." />;

  return (
    <>
      <PageHeader title="Secure Messages" subtitle="Matter-based secure communication." />

      <section className="panel form-panel">
        <h2>Send a secure message</h2>
        <ActionNotice error={error} message={notice} />

        <form onSubmit={handleSend}>
          <label>
            Matter ID
            <input value={matterId} onChange={(e) => setMatterId(e.target.value)} required />
          </label>

          <label>
            Subject
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>

          <label>
            Message
            <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
          </label>

          <button type="submit">Send message</button>
        </form>
      </section>

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
