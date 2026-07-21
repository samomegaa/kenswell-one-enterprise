import { createContractIndex } from '../../staffologyContractResolver';
import { regularPaySource } from '../regularPaySource';
import { TAX_NI_FIELDS } from './taxNiFields';
import { resolveTaxNiField } from './taxNiResolver';

export function adaptStaffologyTaxNi(runtimeWorkspace) {
  const source = regularPaySource(runtimeWorkspace);
  const index = createContractIndex(source);
  const resolve = (field) => resolveTaxNiField(index, TAX_NI_FIELDS[field]);

  return Object.freeze({
    source,
    taxCode: resolve('taxCode'),
    taxBasis: resolve('taxBasis'),
    taxRegime: resolve('taxRegime'),
    starterDeclaration: resolve('starterDeclaration'),
    previousTaxablePay: resolve('previousTaxablePay'),
    previousTaxPaid: resolve('previousTaxPaid'),
    niCategory: resolve('niCategory'),
    niNumber: resolve('niNumber'),
    director: resolve('director'),
    alternativeNiMethod: resolve('alternativeNiMethod'),
    deferNationalInsurance: resolve('deferNationalInsurance'),
    studentLoan: resolve('studentLoan'),
    studentLoanPlan: resolve('studentLoanPlan'),
    postgraduateLoan: resolve('postgraduateLoan'),
  });
}
