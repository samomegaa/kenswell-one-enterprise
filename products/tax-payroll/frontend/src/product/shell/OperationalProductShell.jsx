import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createProductNavigation } from '../createProductNavigation.js';
import ProductNavigation from './ProductNavigation';
import ProductSectionState from './ProductSectionState';
import OperationalDashboard from '../dashboard/OperationalDashboard';
import ActivatedPayrollWorkspace from '../payroll/ActivatedPayrollWorkspace';
import './operational-product-shell.css';

export default function OperationalProductShell({ children }) {
  const navigation = useMemo(() => createProductNavigation(), []);
  const [activeSection, setActiveSection] = useState('dashboard');
  const selected = navigation.find(
    (item) => item.id === activeSection
  ) || navigation[0];

  return (
    <div className="operational-product-shell">
      <ProductNavigation
        items={navigation}
        activeId={selected.id}
        onSelect={setActiveSection}
      />
      <main className="operational-product-shell__main">
        {selected.id === 'dashboard' && (
          <OperationalDashboard>{children}</OperationalDashboard>
        )}

        {selected.id === 'payroll' && (
          <ActivatedPayrollWorkspace />
        )}

        {!['dashboard', 'payroll'].includes(selected.id) && (
          <ProductSectionState section={selected} />
        )}
      </main>
    </div>
  );
}

OperationalProductShell.propTypes = {
  children: PropTypes.node.isRequired,
};
