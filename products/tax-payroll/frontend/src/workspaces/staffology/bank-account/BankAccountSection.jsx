import PropTypes from 'prop-types';
import BankAccountCard from './BankAccountCard';
export default function BankAccountSection({model}) {
  if (!model.available) return <p className="bank-account-state">Bank account information is not present in the current Staffology employee response.</p>;
  if (!model.items.length) return <p className="bank-account-state">No bank accounts are recorded.</p>;
  return <div className="bank-account-list">{model.items.map((account,index)=><BankAccountCard key={account.id || index} account={account} index={index}/>)}</div>;
}
BankAccountSection.propTypes={model:PropTypes.shape({available:PropTypes.bool.isRequired,items:PropTypes.array.isRequired}).isRequired};
