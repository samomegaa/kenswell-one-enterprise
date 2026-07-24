import {
  createValidationFinding,
} from './createValidationFinding';

export function normaliseValidationResults(results = []) {
  return results.map((result) =>
    createValidationFinding(result)
  );
}
