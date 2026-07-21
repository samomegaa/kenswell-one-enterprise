import {
  presentBenefitBoolean,
  presentBenefitMoney,
} from './benefitPresentation';

export function createBenefitPresentationModel(
  model
) {
  return Object.freeze({
    ...model,

    items: Object.freeze(
      model.items.map((item) =>
        Object.freeze({
          ...item,

          cashEquivalent:
            presentBenefitMoney(
              item.cashEquivalent
            ),

          payrolled:
            presentBenefitBoolean(
              item.payrolled
            ),

          p11dRequired:
            presentBenefitBoolean(
              item.p11dRequired
            ),
        })
      )
    ),
  });
}
