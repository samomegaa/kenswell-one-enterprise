import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

import './styles.css';
import './workspaces/framework/workspace.css';
import './workspaces/client/payroll-employees-navigation.css';
import './workspaces/employees/employee-creation.css';
import './workspaces/client/employee-creation-navigation.css';
import './workspaces/employees/employee-editing.css';
import './workspaces/employees/employee-workspace-actions.css';
import './workspaces/employees/metadata/metadata-workspace.css';
import './workspaces/employees/rendering/field-renderer.css';
import './workspaces/employees/readiness/readiness-dashboard.css';
import './workspaces/employees/editing/workspace-editing.css';
import './workspaces/employees/provider/provider-panel.css';
import './workspaces/payroll/payroll-processing.css';
import './workspaces/providers/employer-runtime.css';
import './workspaces/employees/employee-runtime.css';
import './workspaces/providers/enterprise-runtime-integration.css';
import './workspaces/providers/provider-runtime-integration.css';
import './workspaces/providers/organisation-navigation-integration.css';
import './workspaces/employees/runtime-employee-workspace.css';
import './diagnostics/production-diagnostics.css';

const rootElement =
  document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Application root element was not found'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
