import { maskAccountNumber, maskSortCode, presentBoolean, presentPaymentMethod } from './bankAccountPresentation';
export function createBankAccountPresentationModel(model) {
  return Object.freeze({...model,items:Object.freeze(model.items.map((item)=>Object.freeze({...item,
    sortCode:maskSortCode(item.sortCode), accountNumber:maskAccountNumber(item.accountNumber),
    paymentMethod:presentPaymentMethod(item.paymentMethod), primary:presentBoolean(item.primary),
  })))});
}
