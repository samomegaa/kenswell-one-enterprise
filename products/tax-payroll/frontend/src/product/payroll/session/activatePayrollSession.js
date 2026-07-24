const DEFAULT_PROVIDER = 'Staffology';

export function activatePayrollSession(
  runtimeWorkspace
) {
  const employer = runtimeWorkspace?.employer;

  if (!employer?.id) {
    return null;
  }

  return Object.freeze({
    id: `payroll:${employer.id}`,
    employerId: employer.id,
    employerName: employer.name || employer.id,
    provider:
      runtimeWorkspace.provider?.provider ||
      DEFAULT_PROVIDER,
    status: 'active',
    activatedAt: new Date().toISOString(),
    runtimeWorkspace,
  });
}
