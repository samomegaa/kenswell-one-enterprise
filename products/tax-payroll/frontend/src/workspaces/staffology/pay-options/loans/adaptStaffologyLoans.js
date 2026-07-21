import { regularPaySource } from '../regularPaySource';
import { LOAN_FIELDS } from './loanFields';
import { resolveLoanCollection } from './loanCollectionResolver';
import { adaptLoanItem } from './adaptLoanItem';

export function adaptStaffologyLoans(runtimeWorkspace) {
  const source = regularPaySource(runtimeWorkspace);
  const collection = resolveLoanCollection(
    source,
    LOAN_FIELDS.collections
  );

  if (!collection) {
    return Object.freeze({
      source,
      available: false,
      items: Object.freeze([]),
    });
  }

  return Object.freeze({
    source,
    available: true,
    items: Object.freeze(
      collection.map((item) => adaptLoanItem(item, LOAN_FIELDS))
    ),
  });
}
