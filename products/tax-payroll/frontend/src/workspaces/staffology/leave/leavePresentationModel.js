import {
  presentDuration,
  presentLeaveBoolean,
} from './leavePresentation';

export function createLeavePresentationModel(
  model
) {
  return Object.freeze({
    ...model,

    items: Object.freeze(
      model.items.map((item) =>
        Object.freeze({
          ...item,

          duration:
            presentDuration(
              item.duration,
              item.unit
            ),

          paid:
            presentLeaveBoolean(
              item.paid
            ),

          entitlementImpact:
            presentLeaveBoolean(
              item.entitlementImpact
            ),
        })
      )
    ),
  });
}
