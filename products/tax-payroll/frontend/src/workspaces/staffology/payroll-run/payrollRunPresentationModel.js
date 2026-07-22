import { displayCount, displayDate, displayValue } from './payrollRunPresentation';
export function createPayrollRunPresentationModel(contract) {
  const periods=contract.runs.map(run=>({...run,statusLabel:displayValue(run.status),frequencyLabel:displayValue(run.frequency),payDateLabel:displayDate(run.payDate),startDateLabel:displayDate(run.startDate),endDateLabel:displayDate(run.endDate),employeeCountLabel:displayCount(run.employeeCount)}));
  const current=periods[0] || null;
  return {available:contract.available,provider:contract.provider,readOnly:true,source:contract.source,periods,current,metrics:[
    {label:'Payroll periods',value:contract.available?String(periods.length):'Unavailable'},
    {label:'Current status',value:current?current.statusLabel:(contract.available?'No periods':'Unavailable')},
    {label:'Payroll frequency',value:current?current.frequencyLabel:'Unavailable'},
    {label:'Employee count',value:current?current.employeeCountLabel:'Unavailable'},
  ]};
}
