import {
  presentBoolean,
  presentMoney,
  presentStudentLoan,
  presentTaxBasis,
} from './taxNiPresentation';

export function createTaxNiPresentationModel(model) {
  return Object.freeze({
    ...model,
    taxBasis: presentTaxBasis(model.taxBasis),
    previousTaxablePay: presentMoney(model.previousTaxablePay),
    previousTaxPaid: presentMoney(model.previousTaxPaid),
    director: presentBoolean(model.director),
    alternativeNiMethod: presentBoolean(model.alternativeNiMethod),
    deferNationalInsurance: presentBoolean(model.deferNationalInsurance),
    studentLoan: presentStudentLoan(model.studentLoan),
    postgraduateLoan: presentBoolean(model.postgraduateLoan),
  });
}
