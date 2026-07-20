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
