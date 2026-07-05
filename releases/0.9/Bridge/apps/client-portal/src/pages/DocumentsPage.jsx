import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
import ActionNotice from '../components/ActionNotice';
import { clientPortalApi } from '../api/clientPortalApi';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(null);
  const [upload, setUpload] = useState({
    firmId: '',
    clientId: '',
    matterId: '',
    documentId: '',
    originalName: '',
    mimeType: 'application/pdf',
    sizeBytes: '',
  });
  const [preparedFile, setPreparedFile] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  function loadDocuments() {
    return clientPortalApi.documents()
      .then((data) => setDocuments(data.documents || []))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  function updateUpload(field, value) {
    setUpload((current) => ({ ...current, [field]: value }));
  }

  async function prepareUpload(event) {
    event.preventDefault();
    setNotice('');
    setError('');

    try {
      const result = await clientPortalApi.prepareUpload({
        ...upload,
        clientId: upload.clientId || null,
        matterId: upload.matterId || null,
        documentId: upload.documentId || null,
        sizeBytes: Number(upload.sizeBytes),
        visibility: 'client_visible',
        uploadedByType: 'client',
      });

      setPreparedFile(result.fileAsset);
      setNotice('Upload prepared. The real storage upload will be connected in the next deployment phase.');
    } catch (err) {
      setError(err.message);
    }
  }

  async function confirmPreparedUpload() {
    if (!preparedFile) return;

    setNotice('');
    setError('');

    try {
      await clientPortalApi.confirmUpload(preparedFile.id, {});
      setPreparedFile(null);
      setNotice('Upload confirmed.');
      await loadDocuments();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!documents && error) return <ErrorState message={error} />;
  if (!documents) return <LoadingState label="Loading documents..." />;

  return (
    <>
      <PageHeader title="Documents" subtitle="View requests, uploads and approved documents." />

      <section className="panel form-panel">
        <h2>Prepare document upload</h2>
        <ActionNotice error={error} message={notice} />

        <form onSubmit={prepareUpload}>
          <label>
            Firm ID
            <input value={upload.firmId} onChange={(e) => updateUpload('firmId', e.target.value)} required />
          </label>

          <label>
            Client ID
            <input value={upload.clientId} onChange={(e) => updateUpload('clientId', e.target.value)} />
          </label>

          <label>
            Matter ID
            <input value={upload.matterId} onChange={(e) => updateUpload('matterId', e.target.value)} />
          </label>

          <label>
            Document ID
            <input value={upload.documentId} onChange={(e) => updateUpload('documentId', e.target.value)} />
          </label>

          <label>
            File name
            <input value={upload.originalName} onChange={(e) => updateUpload('originalName', e.target.value)} required />
          </label>

          <label>
            MIME type
            <input value={upload.mimeType} onChange={(e) => updateUpload('mimeType', e.target.value)} required />
          </label>

          <label>
            Size bytes
            <input value={upload.sizeBytes} onChange={(e) => updateUpload('sizeBytes', e.target.value)} type="number" required />
          </label>

          <button type="submit">Prepare upload</button>
        </form>

        {preparedFile ? (
          <div className="prepared-upload">
            <span>
              <strong>Prepared file:</strong> {preparedFile.originalName}
            </span>
            <button type="button" className="small-button" onClick={confirmPreparedUpload}>
              Confirm upload
            </button>
          </div>
        ) : null}
      </section>

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
