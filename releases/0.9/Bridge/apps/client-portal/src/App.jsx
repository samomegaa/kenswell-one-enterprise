import ClientPortalLayout from './layouts/ClientPortalLayout';
import LoginPage from './pages/LoginPage';
import ActivatePage from './pages/ActivatePage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import MessagesPage from './pages/MessagesPage';
import TasksPage from './pages/TasksPage';
import ApprovalsPage from './pages/ApprovalsPage';
import ActivityPage from './pages/ActivityPage';

function getRoute() {
  return window.location.hash.replace('#', '') || '/dashboard';
}

function renderPage(route) {
  if (route === '/login') return <LoginPage />;
  if (route === '/activate') return <ActivatePage />;
  if (route === '/documents') return <DocumentsPage />;
  if (route === '/messages') return <MessagesPage />;
  if (route === '/tasks') return <TasksPage />;
  if (route === '/approvals') return <ApprovalsPage />;
  if (route === '/activity') return <ActivityPage />;

  return <DashboardPage />;
}

export default function App() {
  const route = getRoute();

  if (route === '/login' || route === '/activate') {
    return renderPage(route);
  }

  return (
    <ClientPortalLayout>
      {renderPage(route)}
    </ClientPortalLayout>
  );
}
