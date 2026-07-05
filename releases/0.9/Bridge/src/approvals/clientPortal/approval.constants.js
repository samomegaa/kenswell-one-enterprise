const CLIENT_APPROVAL_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
});

const CLIENT_APPROVAL_TYPES = Object.freeze({
  GENERAL: 'general',
  DOCUMENT_APPROVAL: 'document_approval',
  TERMS_ACCEPTANCE: 'terms_acceptance',
  INSTRUCTION_CONFIRMATION: 'instruction_confirmation',
  FEE_APPROVAL: 'fee_approval',
});

module.exports = {
  CLIENT_APPROVAL_STATUS,
  CLIENT_APPROVAL_TYPES,
};
