import { resolveCostCentreField, resolveCostCentres } from './costCentreResolver';

function adaptCostCentre(item, index) {
  return {
    id: resolveCostCentreField(item, 'id') || `cost-centre-${index + 1}`,
    name: resolveCostCentreField(item, 'name'),
    reference: resolveCostCentreField(item, 'reference'),
    description: resolveCostCentreField(item, 'description'),
    manager: resolveCostCentreField(item, 'manager'),
    department: resolveCostCentreField(item, 'department'),
    employeeCount: resolveCostCentreField(item, 'employeeCount'),
    status: resolveCostCentreField(item, 'status'),
  };
}

export function adaptStaffologyCostCentres(input) {
  const source = input?.employer || input?.organisation || input?.organization || input || {};
  const collection = resolveCostCentres(source);
  return { available: collection.available, sourcePath: collection.sourcePath, items: collection.items.map(adaptCostCentre) };
}
