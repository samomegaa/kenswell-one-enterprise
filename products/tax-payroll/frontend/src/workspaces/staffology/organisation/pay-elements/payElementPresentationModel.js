import {
  presentPayElementValue,
} from './payElementPresentation';

export function createPayElementPresentationModel(
  model
) {
  return {
    groups: (model?.groups || []).map((group) => ({
      id: group.id,
      title: group.title,
      singular: group.singular,
      available: group.available,
      items: group.items.map((item) => ({
        id: item.id,
        title: presentPayElementValue(item.name),
        fields: [
          ['Code', item.code],
          ['Category', item.category],
          ['Calculation', item.calculation],
          ['Frequency', item.frequency],
          ['Taxable', item.taxable],
          ['NI-able', item.niable],
          ['Pensionable', item.pensionable],
          ['Status', item.status],
        ].map(([label, value]) => ({
          label,
          value: presentPayElementValue(value),
        })),
      })),
    })),
  };
}
