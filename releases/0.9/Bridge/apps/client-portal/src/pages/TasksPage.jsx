import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import DataList from '../components/DataList';
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
        <DataList
          items={tasks}
          emptyTitle="No open tasks"
          emptyMessage="Tasks assigned by your legal team will appear here."
          getTitle={(task) => task.title}
          getStatus={(task) => task.status}
          getMeta={(task) => task.dueAt ? `Due ${new Date(task.dueAt).toLocaleDateString()}` : task.priority}
        />
      </section>
    </>
  );
}
