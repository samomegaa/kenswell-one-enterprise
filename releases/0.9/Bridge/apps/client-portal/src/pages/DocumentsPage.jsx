import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
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
        <DataList
          items={documents}
          emptyTitle="No documents yet"
          emptyMessage="Document requests and uploaded files will appear here."
          getTitle={(doc) => doc.title}
          getStatus={(doc) => doc.status}
          getMeta={(doc) => doc.fileName || doc.description || 'Document record'}
        />
      </section>
    </>
  );
}
