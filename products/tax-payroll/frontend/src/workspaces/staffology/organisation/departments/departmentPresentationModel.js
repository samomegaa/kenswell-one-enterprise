import { presentDepartmentValue } from './departmentPresentation';

export function createDepartmentPresentationModel(model) {
  return {
    available: Boolean(model?.available),
    items: (model?.items || []).map((item) => ({
      id: item.id,
      title: presentDepartmentValue(item.name),
      fields: [
        ['Reference', item.reference], ['Manager', item.manager],
        ['Parent department', item.parent], ['Cost centre', item.costCentre],
        ['Payroll group', item.payrollGroup], ['Employee count', item.employeeCount],
        ['Status', item.status],
      ].map(([label, value]) => ({ label, value: presentDepartmentValue(value) })),
    })),
  };
}
