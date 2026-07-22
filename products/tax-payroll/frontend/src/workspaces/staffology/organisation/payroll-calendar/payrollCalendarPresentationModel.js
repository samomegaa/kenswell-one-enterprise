import {
  presentCalendarDate,
  presentCalendarValue,
} from './payrollCalendarPresentation';

export function createPayrollCalendarPresentationModel(
  model
) {
  return {
    available: Boolean(model?.available),
    items: (model?.items || []).map((item) => ({
      id: item.id,
      title:
        presentCalendarValue(
          item.name ||
          (
            item.taxPeriod
              ? `Period ${item.taxPeriod}`
              : null
          )
        ),
      fields: [
        ['Tax year', item.taxYear],
        ['Tax period', item.taxPeriod],
        ['Frequency', item.frequency],
        [
          'Period start',
          presentCalendarDate(item.startDate),
        ],
        [
          'Period end',
          presentCalendarDate(item.endDate),
        ],
        [
          'Cut-off date',
          presentCalendarDate(item.cutOffDate),
        ],
        [
          'Payment date',
          presentCalendarDate(item.paymentDate),
        ],
        [
          'Submission deadline',
          presentCalendarDate(
            item.submissionDate
          ),
        ],
        ['Processing status', item.status],
      ].map(([label, value]) => ({
        label,
        value: presentCalendarValue(value),
      })),
    })),
  };
}
