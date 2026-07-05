import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import ActionNotice from '../components/ActionNotice';
import { clientPortalApi } from '../api/clientPortalApi';

export default function TasksPage() {
  const [tasks, setTasks] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  function loadTasks() {
    return clientPortalApi.tasks()
      .then((data) => setTasks(data.tasks || []))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function completeTask(taskId) {
    setNotice('');
    setError('');

    try {
      await clientPortalApi.completeTask(taskId);
      setNotice('Task completed.');
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!tasks && error) return <ErrorState message={error} />;
  if (!tasks) return <LoadingState label="Loading tasks..." />;

  return (
    <>
      <PageHeader title="Tasks" subtitle="Actions requested by your legal team." />
      <ActionNotice error={error} message={notice} />

      <section className="panel">
        {!tasks.length ? (
          <EmptyState title="No open tasks" message="Tasks assigned by your legal team will appear here." />
        ) : (
          <ul className="data-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>{task.dueAt ? `Due ${new Date(task.dueAt).toLocaleDateString()}` : task.priority}</small>
                </div>
                <div className="row-actions">
                  <StatusBadge value={task.status} />
                  {task.status !== 'completed' ? (
                    <button type="button" className="small-button" onClick={() => completeTask(task.id)}>
                      Complete
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
