import PropTypes from 'prop-types';
import { WorkspaceSection } from '../../framework';
import BankAccountSection from './BankAccountSection';
import { createBankAccountPresentationModel } from './bankAccountPresentationModel';
export default function StaffologyBankAccountPanel({model}) {
  const presentation=createBankAccountPresentationModel(model);
  return <WorkspaceSection title="Bank Account" description="Read-only employee payment account information supplied by Staffology."><BankAccountSection model={presentation}/></WorkspaceSection>;
}
StaffologyBankAccountPanel.propTypes={model:PropTypes.shape({available:PropTypes.bool.isRequired,items:PropTypes.array.isRequired}).isRequired};
