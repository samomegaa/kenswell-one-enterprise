import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.documents()
      .then((data) => setDocuments(data.documents || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!documents) return <LoadingState label="Loading documents..." />;

  return (
    <>
      <PageHeader title="Documents" subtitle="View requests, uploads and approved documents." />
      <section className="panel">
        {documents.length === 0 ? <p>No documents yet.</p> : (
          <ul className="simple-list">
            {documents.map((doc) => (
              <li key={doc.id}><strong>{doc.title}</strong><span>{doc.status}</span></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
