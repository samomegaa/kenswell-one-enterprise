import { useContext } from 'react';
import { PayrollPipelineContext } from './PayrollPipelineContext';
export function usePayrollPipeline() {
  const context = useContext(PayrollPipelineContext);
  if (!context) throw new Error('usePayrollPipeline must be used inside PayrollPipelineProvider');
  return context;
}
