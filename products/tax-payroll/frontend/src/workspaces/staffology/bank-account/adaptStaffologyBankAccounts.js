import { BANK_ACCOUNT_FIELDS } from './bankAccountFields';
import { findBankAccounts, firstBankValue } from './bankAccountResolver';
function sourceOf(runtimeWorkspace) { return runtimeWorkspace?.employee || runtimeWorkspace?.workspace || runtimeWorkspace?.data || runtimeWorkspace || {}; }
function adaptItem(item) {
  const resolve = (field) => firstBankValue(item, BANK_ACCOUNT_FIELDS[field]);
  return Object.freeze({
    source:item, id:item?.id || item?.bankAccountId || null,
    accountName:resolve('accountName'), bankName:resolve('bankName'), sortCode:resolve('sortCode'),
    accountNumber:resolve('accountNumber'), rollNumber:resolve('rollNumber'), paymentMethod:resolve('paymentMethod'),
    primary:resolve('primary'), effectiveFrom:resolve('effectiveFrom'), effectiveTo:resolve('effectiveTo'), status:resolve('status'),
  });
}
export function adaptStaffologyBankAccounts(runtimeWorkspace) {
  const source=sourceOf(runtimeWorkspace);
  const accounts=findBankAccounts(source,BANK_ACCOUNT_FIELDS.collections,BANK_ACCOUNT_FIELDS.objects);
  if (!accounts) return Object.freeze({source,available:false,items:Object.freeze([])});
  return Object.freeze({source,available:true,items:Object.freeze(accounts.map(adaptItem))});
}
