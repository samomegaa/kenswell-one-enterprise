import PropTypes from 'prop-types';
import StaffologyField from '../StaffologyField';
export default function BankAccountCard({account,index}) {
  return <section className="bank-account-card"><h3>{account.primary === 'Yes' ? 'Primary bank account' : `Bank account ${index + 1}`}</h3>
    <dl className="staffology-field-grid">
      <StaffologyField label="Account name" value={account.accountName}/><StaffologyField label="Bank name" value={account.bankName}/>
      <StaffologyField label="Payment method" value={account.paymentMethod}/><StaffologyField label="Primary account" value={account.primary}/>
      <StaffologyField label="Sort code" value={account.sortCode}/><StaffologyField label="Account number" value={account.accountNumber}/>
      <StaffologyField label="Building society roll number" value={account.rollNumber}/><StaffologyField label="Status" value={account.status}/>
      <StaffologyField label="Effective from" value={account.effectiveFrom}/><StaffologyField label="Effective to" value={account.effectiveTo}/>
    </dl></section>;
}
BankAccountCard.propTypes={account:PropTypes.object.isRequired,index:PropTypes.number.isRequired};
