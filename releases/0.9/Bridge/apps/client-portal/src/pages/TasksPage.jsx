import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { clientPortalApi } from '../api/clientPortalApi';

export default function TasksPage() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clientPortalApi.tasks()
      .then((data) => setTasks(data.tasks || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!tasks) return <LoadingState label="Loading tasks..." />;

  return (
    <>
      <PageHeader title="Tasks" subtitle="Actions requested by your legal team." />
      <section className="panel">
        {tasks.length === 0 ? <p>No tasks yet.</p> : (
          <ul className="simple-list">
            {tasks.map((task) => (
              <li key={task.id}><strong>{task.title}</strong><span>{task.status}</span></li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
