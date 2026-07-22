import { resolvePayrollRunCollection, resolvePayrollRunField } from './payrollRunResolver';
const adapt=(run,index)=>({
  id: resolvePayrollRunField(run,'id') || `payroll-run-${index+1}`,
  name: resolvePayrollRunField(run,'name') || `Payroll period ${index+1}`,
  status: resolvePayrollRunField(run,'status'), frequency: resolvePayrollRunField(run,'frequency'),
  payDate: resolvePayrollRunField(run,'payDate'), startDate: resolvePayrollRunField(run,'startDate'),
  endDate: resolvePayrollRunField(run,'endDate'), employeeCount: resolvePayrollRunField(run,'employeeCount'),
});
export function adaptStaffologyPayrollRun(employer) {
  const collection=resolvePayrollRunCollection(employer);
  return {available:collection.available,source:collection.source,provider:'Staffology',readOnly:true,runs:collection.items.map(adapt)};
}
