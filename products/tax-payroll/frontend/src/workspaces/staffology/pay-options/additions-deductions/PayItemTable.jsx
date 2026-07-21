import PropTypes from 'prop-types';

import {
  formatPayItemAmount,
} from './formatPayItem';

function display(value) {
  return (
    value === undefined ||
    value === null ||
    value === ''
  )
    ? '—'
    : String(value);
}

export default function PayItemTable({ items }) {
  return (
    <div className="pay-item-table-wrap">
      <table className="pay-item-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Code</th>
            <th>Amount</th>
            <th>Frequency</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id || index}>
              <td>{display(item.description)}</td>
              <td>{display(item.code)}</td>
              <td>
                {display(
                  formatPayItemAmount(item.amount)
                )}
              </td>
              <td>{display(item.frequency)}</td>
              <td>{display(item.startDate)}</td>
              <td>{display(item.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PayItemTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};
