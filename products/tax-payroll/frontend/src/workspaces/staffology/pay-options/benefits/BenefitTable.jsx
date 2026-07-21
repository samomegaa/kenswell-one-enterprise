import PropTypes from 'prop-types';

import {
  displayBenefitValue,
} from './benefitPresentation';

export default function BenefitTable({
  items,
}) {
  return (
    <div className="benefit-table-wrap">
      <table className="benefit-table">
        <thead>
          <tr>
            <th>Benefit type</th>
            <th>Description</th>
            <th>Cash equivalent</th>
            <th>Payrolled</th>
            <th>P11D required</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((benefit, index) => (
            <tr key={benefit.id || index}>
              <td>
                {displayBenefitValue(
                  benefit.type
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.description
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.cashEquivalent
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.payrolled
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.p11dRequired
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.startDate
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.endDate
                )}
              </td>
              <td>
                {displayBenefitValue(
                  benefit.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BenefitTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};
