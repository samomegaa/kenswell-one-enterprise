function formatTaxYear(startYear) {
  return `${startYear} / ${startYear + 1}`;
}

export function createDefaultPayrollPeriod(session) {
  if (!session?.employerId) {
    return null;
  }

  const now = new Date();
  const month = now.toLocaleString('en-GB', {
    month: 'long',
  });

  const taxYearStart =
    now.getMonth() < 3
      ? now.getFullYear() - 1
      : now.getFullYear();

  return Object.freeze({
    id: `${session.employerId}:${now.getFullYear()}-${now.getMonth() + 1}`,
    employerId: session.employerId,
    label: `${month} ${now.getFullYear()}`,
    taxYear: formatTaxYear(taxYearStart),
    frequency: 'Monthly',
    status: 'active',
    stage: 'employee-selection',
    activatedAt: now.toISOString(),
  });
}
