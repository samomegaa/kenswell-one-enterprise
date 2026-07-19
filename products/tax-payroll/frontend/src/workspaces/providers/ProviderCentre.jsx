import {
  useEffect,
  useState,
} from 'react';

import './provider-centre.css';
import './provider-centre-responsive.css';
import './provider-health.css';
import './provider-employers.css';
import './provider-linking.css';
import './provider-linking-refinement.css';
import './linked-employer-bridge.css';

import {
  getProviderCentre,
  getStaffologyEmployers,
} from '../../services/provider-centre-api';

import ProviderCard from './ProviderCard';
import IntegratedStaffologyWorkspace from './IntegratedStaffologyWorkspace';

const providerCopy = {
  staffology: {
    name: 'Staffology',
    description: 'Live payroll execution provider',
  },
  brightpay: {
    name: 'BrightPay',
    description: 'Future payroll provider',
  },
  moneysoft: {
    name: 'Moneysoft',
    description: 'Future payroll provider',
  },
};

export default function ProviderCentre({
  onBack,
  onOpenClientPayroll,
}) {
  const [health, setHealth] = useState(null);
  const [healthStatus, setHealthStatus] =
    useState('loading');
  const [selectedProvider, setSelectedProvider] =
    useState(null);
  const [employers, setEmployers] =
    useState(null);
  const [employerStatus, setEmployerStatus] =
    useState('idle');
  const [error, setError] = useState('');

  async function loadHealth() {
    setHealthStatus('loading');
    setError('');
    try {
      setHealth(await getProviderCentre());
      setHealthStatus('ready');
    } catch (requestError) {
      setError(requestError.message);
      setHealthStatus('error');
    }
  }

  async function openStaffology() {
    setSelectedProvider('staffology');
    setEmployerStatus('loading');
    setError('');
    try {
      setEmployers(await getStaffologyEmployers());
      setEmployerStatus('ready');
    } catch (requestError) {
      setError(requestError.message);
      setEmployerStatus('error');
    }
  }

  useEffect(() => {
    loadHealth();
  }, []);

  if (selectedProvider === 'staffology') {
  return (
    <IntegratedStaffologyWorkspace
      data={employers}
      status={employerStatus}
      error={error}
      onRetry={openStaffology}
      onBack={() => {
        setSelectedProvider(null);
      }}
      onOpenClientPayroll={onOpenClientPayroll}
    />
  );
}
  return (
    <main className="provider-centre-shell">
      <button className="provider-back-button" type="button" onClick={onBack}>
        ← Back to practice
      </button>

      <header className="provider-centre-header">
        <div>
          <p className="eyebrow">Enterprise payroll</p>
          <h1>Provider Centre</h1>
          <p>Live health and employer discovery remain behind Kenswell.</p>
        </div>
        <div className="provider-summary">
          <span>Connected providers</span>
          <strong>{health?.connectedProviders ?? '—'}</strong>
        </div>
      </header>

      {healthStatus === 'loading' && (
        <section className="provider-state">Checking provider health…</section>
      )}

      {healthStatus === 'error' && (
        <section className="provider-state provider-state-error">
          <strong>Provider health could not be loaded</strong>
          <span>{error}</span>
          <button type="button" onClick={loadHealth}>Try again</button>
        </section>
      )}

      {healthStatus === 'ready' && (
        <section className="provider-centre-grid">
          {health.providers.map((provider) => {
            const copy = providerCopy[provider.name];
            return (
              <ProviderCard
                key={provider.name}
                name={copy.name}
                description={copy.description}
                status={provider.status}
                employerCount={provider.name === 'staffology' ? employers?.count ?? null : null}
                linkedCount={provider.name === 'staffology' ? 0 : null}
                disabled={provider.status === 'coming_soon'}
                onOpen={provider.name === 'staffology' ? openStaffology : undefined}
              />
            );
          })}
        </section>
      )}

      <section className="provider-boundary-note">
        <strong>Kenswell remains the gateway.</strong>
        <p>Employer data is retrieved through the Enterprise Payroll Manager.</p>
      </section>
    </main>
  );
}
