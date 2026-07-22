import PropTypes from 'prop-types';

import {
  displayLeaveValue,
} from './leavePresentation';

export default function LeaveTable({
  items,
}) {
  return (
    <div className="leave-table-wrap">
      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave type</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Paid</th>
            <th>Payment status</th>
            <th>Entitlement impact</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>

        <tbody>
          {items.map((record, index) => (
            <tr key={record.id || index}>
              <td>{displayLeaveValue(record.type)}</td>
              <td>{displayLeaveValue(record.startDate)}</td>
              <td>{displayLeaveValue(record.endDate)}</td>
              <td>{displayLeaveValue(record.duration)}</td>
              <td>{displayLeaveValue(record.paid)}</td>
              <td>
                {displayLeaveValue(
                  record.paymentStatus
                )}
              </td>
              <td>
                {displayLeaveValue(
                  record.entitlementImpact
                )}
              </td>
              <td>{displayLeaveValue(record.status)}</td>
              <td>{displayLeaveValue(record.reason)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LeaveTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};
