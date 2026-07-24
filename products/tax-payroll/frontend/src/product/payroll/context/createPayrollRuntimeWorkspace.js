export function createPayrollRuntimeWorkspace(employer) {
  if (!employer?.id) {
    return null;
  }

  const provider =
    employer.provider?.provider ||
    employer.provider ||
    'Staffology';

  return Object.freeze({
    employer,
    workspace: Object.freeze({
      employerId: employer.id,
      employerName: employer.name || employer.id,
      provider,
      source: 'enterprise-employer-runtime',
    }),
    provider: Object.freeze({
      provider,
      employerId: employer.id,
      employerName: employer.name || employer.id,
    }),
  });
}
