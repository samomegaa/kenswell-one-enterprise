export const STAFFOLOGY_CAPABILITY_STATE =
  Object.freeze({
    AVAILABLE: 'available',
    PARTIAL: 'partial',
    UNSUPPORTED: 'unsupported',
    UNKNOWN: 'unknown',
  });

export function createStaffologyCapabilities(
  capabilities = {}
) {
  return Object.freeze({
    basicDetails:
      capabilities.basicDetails ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    employment:
      capabilities.employment ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    payOptions:
      capabilities.payOptions ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    attachmentOrders:
      capabilities.attachmentOrders ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    bankAccount:
      capabilities.bankAccount ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    leave:
      capabilities.leave ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    pension:
      capabilities.pension ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    notes:
      capabilities.notes ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,

    more:
      capabilities.more ||
      STAFFOLOGY_CAPABILITY_STATE.UNKNOWN,
  });
}
