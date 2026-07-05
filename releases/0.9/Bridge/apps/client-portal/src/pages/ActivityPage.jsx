import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

export default function ActivityPage() {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.activity()
      .then((data) => setActivity(data.activity || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!activity) return <LoadingState label="Loading activity..." />;

  return (
    <>
      <PageHeader title="Activity" subtitle="A full activity stream across your portal." />
      <section className="panel">
        {activity.length === 0 ? <p>No activity yet.</p> : (
          <ul className="simple-list">
            {activity.map((item) => (
              <li key={item.id}><strong>{item.title}</strong><span>{item.event}</span></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
