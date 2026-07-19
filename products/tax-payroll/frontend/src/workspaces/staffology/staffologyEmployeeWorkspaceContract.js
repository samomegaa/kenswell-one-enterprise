export const STAFFOLOGY_EMPLOYEE_TABS =
  Object.freeze([
    Object.freeze({
      id: 'basic-details',
      label: 'Basic Details',
      capability: 'employee.basicDetails',
    }),
    Object.freeze({
      id: 'employment',
      label: 'Employment',
      capability: 'employee.employment',
    }),
    Object.freeze({
      id: 'pay-options',
      label: 'Pay Options',
      capability: 'employee.payOptions',
      children: Object.freeze([
        Object.freeze({
          id: 'regular-pay',
          label: 'Regular Pay',
        }),
        Object.freeze({
          id: 'additions-deductions',
          label: 'Additions & Deductions',
        }),
        Object.freeze({
          id: 'loans',
          label: 'Loans',
        }),
        Object.freeze({
          id: 'tax-ni',
          label: 'Tax & NI',
        }),
        Object.freeze({
          id: 'other',
          label: 'Other',
        }),
        Object.freeze({
          id: 'benefits',
          label: 'Benefits',
        }),
      ]),
    }),
    Object.freeze({
      id: 'attachment-orders',
      label: 'Attachment Orders',
      capability: 'employee.attachmentOrders',
    }),
    Object.freeze({
      id: 'bank-account',
      label: 'Bank Account',
      capability: 'employee.bankAccount',
    }),
    Object.freeze({
      id: 'leave',
      label: 'Leave',
      capability: 'employee.leave',
    }),
    Object.freeze({
      id: 'pension',
      label: 'Pension',
      capability: 'employee.pension',
      children: Object.freeze([
        Object.freeze({
          id: 'settings',
          label: 'Settings',
        }),
        Object.freeze({
          id: 'assessments',
          label: 'Assessments',
        }),
        Object.freeze({
          id: 'refunds',
          label: 'Refunds',
        }),
      ]),
    }),
    Object.freeze({
      id: 'notes',
      label: 'Notes',
      capability: 'employee.notes',
    }),
    Object.freeze({
      id: 'more',
      label: 'More',
      capability: 'employee.more',
    }),
  ]);

export function findStaffologyEmployeeTab(
  tabId
) {
  return (
    STAFFOLOGY_EMPLOYEE_TABS.find(
      (tab) => tab.id === tabId
    ) || null
  );
}

export function defaultStaffologyEmployeeTab() {
  return STAFFOLOGY_EMPLOYEE_TABS[0];
}
