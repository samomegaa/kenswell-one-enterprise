import PropTypes from 'prop-types';

import EnterpriseEmployeeWorkspace
  from './EnterpriseEmployeeWorkspace';

export default function EmployeeWorkspace({
  employeeId,
  onBack,
}) {
  return (
    <EnterpriseEmployeeWorkspace
      employeeId={employeeId}
      onBack={onBack}
    />
  );
}

EmployeeWorkspace.propTypes = {
  employeeId: PropTypes.string.isRequired,
  onBack: PropTypes.func,
};
