import {
  presentOtherBoolean,
  presentPaymentMethod,
} from './otherPresentation';

export function createOtherPresentationModel(
  model
) {
  return Object.freeze({
    ...model,

    paymentMethod:
      presentPaymentMethod(
        model.paymentMethod
      ),

    onHold:
      presentOtherBoolean(model.onHold),

    excludeFromPayroll:
      presentOtherBoolean(
        model.excludeFromPayroll
      ),

    irregularPaymentPattern:
      presentOtherBoolean(
        model.irregularPaymentPattern
      ),

    offPayrollWorker:
      presentOtherBoolean(
        model.offPayrollWorker
      ),

    occupationalPension:
      presentOtherBoolean(
        model.occupationalPension
      ),

    foreignTaxCredit:
      presentOtherBoolean(
        model.foreignTaxCredit
      ),

    expatriate:
      presentOtherBoolean(
        model.expatriate
      ),
  });
}
