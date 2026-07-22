import PropTypes from 'prop-types';

import {
  adaptStaffologyPayElements,
} from './adaptStaffologyPayElements';

import {
  createPayElementPresentationModel,
} from './payElementPresentationModel';

import PayElementGroup from './PayElementGroup';

import './pay-elements.css';

export default function StaffologyPayElementsWorkspace({
  employer,
}) {
  const model = createPayElementPresentationModel(
    adaptStaffologyPayElements(employer)
  );

  return (
    <section className="pay-elements-workspace">
      <header className="pay-elements-workspace__header">
        <h2>Pay Elements</h2>
        <p>
          Organisation-level payroll elements supplied
          by Staffology.
        </p>
      </header>

      {model.groups.map((group) => (
        <PayElementGroup
          key={group.id}
          group={group}
        />
      ))}
    </section>
  );
}

StaffologyPayElementsWorkspace.propTypes = {
  employer: PropTypes.object.isRequired,
};
