import {
  firstItemValue,
} from './itemResolver';

export function adaptPayItem(item, fields) {
  return Object.freeze({
    source: item,
    id:
      item?.id ||
      item?.itemId ||
      item?.payCodeId ||
      null,
    description:
      firstItemValue(item, fields.description),
    code:
      firstItemValue(item, fields.code),
    amount:
      firstItemValue(item, fields.amount),
    frequency:
      firstItemValue(item, fields.frequency),
    startDate:
      firstItemValue(item, fields.startDate),
    endDate:
      firstItemValue(item, fields.endDate),
  });
}
