function firstValue(...values) {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ''
  );
}

function asObject(value) {
  return value && typeof value === 'object'
    ? value
    : {};
}

export function adaptRuntimeEmployee({
  employer,
  employee,
  workspace,
}) {
  const source = asObject(
    workspace?.employee ||
    workspace?.canonicalEmployee ||
    workspace?.data?.employee ||
    employee
  );

  const identity = asObject(source.identity);
  const employment = asObject(source.employment);
  const payroll = asObject(source.payroll);
  const tax = asObject(source.tax);
  const pension = asObject(source.pension);
  const leave = asObject(source.leave);
  const provider = asObject(source.provider);

  const firstName = firstValue(
    identity.firstName,
    source.firstName,
    source.first
  );

  const lastName = firstValue(
    identity.lastName,
    source.lastName,
    source.surname,
    source.last
  );

  const displayName = firstValue(
    identity.displayName,
    source.displayName,
    source.fullName,
    source.name,
    [firstName, lastName].filter(Boolean).join(' ')
  );

  return {
    ...source,
    id: firstValue(
      source.id,
      source.employeeId,
      employee?.id
    ),
    clientId: firstValue(
      source.clientId,
      workspace?.clientId,
      null
    ),
    employerId: firstValue(
      source.employerId,
      employer?.id
    ),
    version: firstValue(source.version, 1),
    createdAt: firstValue(
      source.createdAt,
      workspace?.createdAt,
      new Date().toISOString()
    ),
    updatedAt: firstValue(
      source.updatedAt,
      workspace?.updatedAt,
      new Date().toISOString()
    ),
    identity: {
      ...identity,
      firstName,
      lastName,
      displayName,
      title: firstValue(
        identity.title,
        source.title
      ),
      email: firstValue(
        identity.email,
        source.email
      ),
      phone: firstValue(
        identity.phone,
        source.phone
      ),
    },
    employment: {
      ...employment,
      status: firstValue(
        employment.status,
        source.status,
        source.state,
        'unknown'
      ),
      payrollCode: firstValue(
        employment.payrollCode,
        payroll.payrollCode,
        source.payrollCode,
        source.employeeCode,
        source.reference
      ),
      startDate: firstValue(
        employment.startDate,
        source.startDate
      ),
      jobTitle: firstValue(
        employment.jobTitle,
        source.jobTitle
      ),
    },
    payroll,
    tax,
    pension,
    leave,
    provider: {
      ...provider,
      provider: firstValue(
        provider.provider,
        employer?.provider,
        'Staffology'
      ),
      employerId: firstValue(
        provider.employerId,
        employer?.id
      ),
      employerName: firstValue(
        provider.employerName,
        employer?.name
      ),
    },
    runtime: {
      employer,
      workspace,
      source: 'enterprise-runtime',
    },
  };
}
