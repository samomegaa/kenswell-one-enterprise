import { useMemo, useState } from 'react';
import './client-workspace.css';
import PayrollEmployeesPanel from './tabs/PayrollEmployeesPanel';
import './payroll-employees.css';

const TABS = Object.freeze([
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'documents', label: 'Documents' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'activity', label: 'Activity' },
]);

function formatClientType(value) { return ({ limited_company: 'Limited company', sole_trader: 'Sole trader', partnership: 'Partnership', individual: 'Individual' })[value] || 'Client'; }
function formatStatus(value) { return value ? value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) : 'Unknown'; }
function PlaceholderTab({ title, description }) { return <div className="client-placeholder"><h2>{title}</h2><p>{description}</p></div>; }
function renderTab({ activeTab, client }) { if (activeTab === 'payroll') return <PayrollEmployeesPanel clientId={client.id} />; return <PlaceholderTab title={formatStatus(activeTab)} description="This workspace area is ready for the next release slice." />; }

export default function ClientWorkspace({ client, onBack, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const employer = client.payroll?.employer;
  const nextAction = employer?.nextActionLabel || 'Review client services';
  const activeTabLabel = useMemo(() => TABS.find((tab) => tab.id === activeTab)?.label || 'Client workspace', [activeTab]);

  return (
    <main className="client-workspace">
      <button type="button" className="client-workspace-back" onClick={onBack}>← Back to practice</button>
      <header className="client-workspace-header"><div className="client-workspace-identity"><div className="client-workspace-avatar">{client.businessName.slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">Client workspace</p><h1>{client.businessName}</h1><div className="client-workspace-meta"><span>{formatClientType(client.clientType)}</span><span className="client-workspace-status client-workspace-status-active">{formatStatus(client.status)}</span></div></div></div><div className="client-workspace-next-action"><span>Recommended next action</span><strong>{nextAction}</strong></div></header>
      <nav className="client-workspace-tabs" aria-label="Client workspace">{TABS.map((tab) => <button key={tab.id} type="button" className={activeTab === tab.id ? 'client-workspace-tab active' : 'client-workspace-tab'} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</nav>
      <section className="client-workspace-content" aria-label={activeTabLabel}>{renderTab({ activeTab, client })}</section>
    </main>
  );
}
