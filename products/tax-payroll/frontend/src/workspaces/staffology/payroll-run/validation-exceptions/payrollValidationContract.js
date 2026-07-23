export const PAYROLL_VALIDATION_CONTRACT = Object.freeze({
  collectionKeys: Object.freeze([
    'validationErrors',
    'validations',
    'exceptions',
    'issues',
    'warnings',
  ]),
  fields: Object.freeze({
    id: Object.freeze([
      'id',
      'validationId',
      'exceptionId',
      'code',
    ]),
    code: Object.freeze([
      'code',
      'validationCode',
      'ruleCode',
    ]),
    message: Object.freeze([
      'message',
      'description',
      'detail',
      'text',
    ]),
    severity: Object.freeze([
      'severity',
      'level',
      'type',
      'category',
    ]),
    employeeName: Object.freeze([
      'employeeName',
      'employee.displayName',
      'employee.name',
      'subjectName',
    ]),
    employeeReference: Object.freeze([
      'employeeReference',
      'employee.reference',
      'payrollReference',
    ]),
    field: Object.freeze([
      'field',
      'property',
      'path',
    ]),
  }),
});
