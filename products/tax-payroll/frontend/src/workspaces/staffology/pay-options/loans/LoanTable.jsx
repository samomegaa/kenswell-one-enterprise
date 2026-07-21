import PropTypes from 'prop-types';
import { displayLoanValue, formatLoanMoney } from './loanFormatters';

export default function LoanTable({ items }) {
  return (
    <div className="loan-table-wrap">
      <table className="loan-table">
        <thead>
          <tr>
            <th>Loan type</th>
            <th>Reference</th>
            <th>Deduction amount</th>
            <th>Outstanding balance</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((loan, index) => (
            <tr key={loan.id || index}>
              <td>{displayLoanValue(loan.type)}</td>
              <td>{displayLoanValue(loan.reference)}</td>
              <td>{displayLoanValue(formatLoanMoney(loan.deductionAmount))}</td>
              <td>{displayLoanValue(formatLoanMoney(loan.outstandingBalance))}</td>
              <td>{displayLoanValue(loan.startDate)}</td>
              <td>{displayLoanValue(loan.endDate)}</td>
              <td>{displayLoanValue(loan.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LoanTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
