export const PAYROLL_RUN_CONTRACT = Object.freeze({
  collectionKeys: Object.freeze(['payrollRuns','payRuns','runs','payrollPeriods','periods']),
  fields: Object.freeze({
    id: ['id','payRunId','payrollRunId'], name: ['name','title','description'],
    status: ['status','state','processingStatus'], frequency: ['payFrequency','frequency','paySchedule'],
    payDate: ['payDate','paymentDate'], startDate: ['startDate','periodStart','from'],
    endDate: ['endDate','periodEnd','to'], employeeCount: ['employeeCount','employeesCount','numberOfEmployees'],
  }),
});
