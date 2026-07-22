import { presentCostCentreValue } from './costCentrePresentation';

export function createCostCentrePresentationModel(model) {
  return {
    available: Boolean(model?.available),
    items: (model?.items || []).map((item) => ({
      id: item.id, title: presentCostCentreValue(item.name),
      fields: [
        ['Reference', item.reference], ['Description', item.description], ['Manager', item.manager],
        ['Department', item.department], ['Employee count', item.employeeCount], ['Status', item.status],
      ].map(([label, value]) => ({ label, value: presentCostCentreValue(value) })),
    })),
  };
}
