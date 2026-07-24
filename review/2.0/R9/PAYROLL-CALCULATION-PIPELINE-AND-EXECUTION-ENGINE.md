# Payroll Calculation Pipeline & Execution Engine

## Composition

PayrollSessionProvider → PayrollPeriodProvider → PayrollOrchestratorProvider → PayrollPipelineProvider → PayrollOperationalWorkspace → StaffologyPayrollRunWorkspace

The pipeline owns execution progress, queues, checkpoints and results. The execution engine delegates jobs through a provider adapter. It does not implement PAYE, National Insurance, pension or payroll calculations.
