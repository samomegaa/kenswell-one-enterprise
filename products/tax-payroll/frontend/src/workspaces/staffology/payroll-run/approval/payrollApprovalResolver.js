import { PAYROLL_APPROVAL_CONTRACT } from './payrollApprovalContract';

function readPath(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function findObject(roots) {
  for (const root of roots) {
    if (!root) continue;
    for (const key of PAYROLL_APPROVAL_CONTRACT.objectKeys) {
      const value = readPath(root, key);
      if (value && typeof value === 'object') return { source: key, value };
    }
  }
  return null;
}

function findCollection(roots, keys) {
  for (const root of roots) {
    if (!root) continue;
    for (const key of keys) {
      const value = readPath(root, key);
      if (Array.isArray(value)) return value;
      if (Array.isArray(value?.items)) return value.items;
    }
  }
  return [];
}

export function resolvePayrollApproval(employer, payrollRun) {
  const roots = [
    payrollRun?.source,
    payrollRun,
    employer?.payroll,
    employer?.runtime,
    employer?.workspace,
    employer,
  ];
  const approval = findObject(roots);
  const scoped = approval ? [approval.value, ...roots] : roots;
  return {
    available: Boolean(approval),
    source: approval?.source || null,
    approval: approval?.value || null,
    history: findCollection(scoped, PAYROLL_APPROVAL_CONTRACT.historyKeys),
    blockers: findCollection(scoped, PAYROLL_APPROVAL_CONTRACT.blockerKeys),
    requirements: findCollection(scoped, PAYROLL_APPROVAL_CONTRACT.requirementKeys),
  };
}

export function resolvePayrollApprovalField(approval, field) {
  for (const candidate of PAYROLL_APPROVAL_CONTRACT.fields[field] || []) {
    const value = readPath(approval, candidate);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return null;
}
