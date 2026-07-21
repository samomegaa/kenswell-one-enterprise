import {
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  adaptStaffologyRegularPay,
} from './adaptStaffologyRegularPay';

import {
  PAY_OPTION_SECTIONS,
} from './payOptionSections';

import PayOptionsNavigation
  from './PayOptionsNavigation';

import PayOptionReserved
  from './PayOptionReserved';

import StaffologyRegularPayPanel
  from './StaffologyRegularPayPanel';

import {
  StaffologyAdditionsDeductionsPanel,
  adaptStaffologyAdditionsDeductions,
} from './additions-deductions';

import {
  StaffologyLoansPanel,
  adaptStaffologyLoans,
} from './loans';

import './loans/loans.css';

import {
  StaffologyTaxNiPanel,
  adaptStaffologyTaxNi,
} from './tax-ni';

import './tax-ni/tax-ni.css';

import './additions-deductions/additions-deductions.css';

import './staffology-pay-options.css';

export default function StaffologyPayOptionsWorkspace({
  runtimeWorkspace,
}) {
  const [activeSection, setActiveSection] =
    useState('regular-pay');

  const regularPay = useMemo(
    () => adaptStaffologyRegularPay(
      runtimeWorkspace
    ),
    [runtimeWorkspace]
  );

  const additionsDeductions = useMemo(
    () => adaptStaffologyAdditionsDeductions(
      runtimeWorkspace
    ),
    [runtimeWorkspace]
  );

  const loans = useMemo(
    () => adaptStaffologyLoans(
      runtimeWorkspace
    ),
    [runtimeWorkspace]
  );

  const taxNi = useMemo(
    () => adaptStaffologyTaxNi(
      runtimeWorkspace
    ),
    [runtimeWorkspace]
  );

  const selected =
    PAY_OPTION_SECTIONS.find(
      (section) => section.id === activeSection
    ) || PAY_OPTION_SECTIONS[0];

  return (
    <div className="staffology-pay-options">
      <PayOptionsNavigation
        activeId={activeSection}
        onSelect={setActiveSection}
      />

      {activeSection === 'regular-pay' ? (
        <StaffologyRegularPayPanel
          regularPay={regularPay}
        />
      ) : activeSection === 'additions-deductions' ? (
        <StaffologyAdditionsDeductionsPanel
          model={additionsDeductions}
        />
      ) : activeSection === 'loans' ? (
        <StaffologyLoansPanel
          model={loans}
        />
      ) : activeSection === 'tax-ni' ? (
        <StaffologyTaxNiPanel
          model={taxNi}
        />
      ) : (
        <PayOptionReserved
          title={selected.label}
        />
      )}
    </div>
  );
}

StaffologyPayOptionsWorkspace.propTypes = {
  runtimeWorkspace: PropTypes.object.isRequired,
};
