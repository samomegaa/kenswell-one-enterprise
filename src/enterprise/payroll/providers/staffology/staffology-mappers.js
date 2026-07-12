function splitPayeReference(value = '') {
  const [officeNumber = '', payeReference = ''] =
    String(value).split('/');

  return {
    officeNumber,
    payeReference,
  };
}

function mapEmployer(input = {}) {
  const paye = splitPayeReference(input.payeReference);

  return {
    name: input.legalName || input.name,
    hmrcDetails: {
      officeNumber: paye.officeNumber,
      payeReference: paye.payeReference,
      accountsOfficeReference:
        input.accountsOfficeReference ||
        input.accountsOfficeRef ||
        '',
    },
  };
}

function mapPayOptions(input = {}) {
  const period = input.period || input.frequency || 'Monthly';

  return {
    basis: input.basis || period,
    period,
    payAmount: input.payAmount ?? 0,
    method: input.payMethod || 'Credit',

    taxAndNi: {
      taxCode: input.taxCode || '1257L',
      niTable: input.niTable || 'A',
      studentLoan: input.studentLoan || 'None',
      postgradLoan: Boolean(input.postgradLoan),
    },

    regularPayLines: Array.isArray(input.regularPayLines)
      ? [...input.regularPayLines]
      : [],
  };
}

function mapEmployee(input = {}) {
  return {
    personalDetails: {
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      niNumber: input.nationalInsuranceNumber ||
        input.nino ||
        '',
      ...(input.address
        ? { address: { ...input.address } }
        : {}),
    },

    employmentDetails: {
      payrollCode: input.payrollCode || undefined,
      starterDetails: {
        startDate: input.startDate,
        starterDeclaration:
          input.starterDeclaration || 'A',
      },
    },

    payOptions: mapPayOptions(input),
  };
}

function applyPayInstruction(payOptions = {}, instruction = {}) {
  const next = {
    ...payOptions,
    taxAndNi: {
      ...(payOptions.taxAndNi || {}),
    },
    regularPayLines: [
      ...(payOptions.regularPayLines || []),
    ],
  };

  const payload = instruction.payload || {};

  switch (instruction.type) {
    case 'Salary':
      next.payAmount = payload.Value ?? next.payAmount;

      if (payload.Basis) {
        next.basis = payload.Basis;
      }

      break;

    case 'StudentLoan':
      next.taxAndNi.studentLoan =
        payload.Plan || 'PlanType1';
      break;

    case 'Pension':
      next.regularPayLines.push({
        value: -Math.abs(payload.Value || 0),
        description: payload.Description ||
          'Pension Contribution',
        code: payload.Code || 'PENSION',
      });
      break;

    default:
      next.regularPayLines.push({
        value: payload.Value,
        description:
          payload.Description ||
          instruction.type ||
          'Pay adjustment',
        code:
          payload.Code ||
          instruction.type ||
          'ADJUSTMENT',
      });
  }

  return next;
}

function normaliseJobStatus(value) {
  const raw = String(value || '').toLowerCase();

  if (
    raw.includes('accept') ||
    raw.includes('success') ||
    raw.includes('complete')
  ) {
    return 'complete';
  }

  if (
    raw.includes('reject') ||
    raw.includes('error') ||
    raw.includes('fail')
  ) {
    return 'failed';
  }

  return 'processing';
}


function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidates = [
    payload?.items,
    payload?.results,
    payload?.data,
    payload?.employers,
  ];

  return candidates.find(Array.isArray) || [];
}

function mapEmployerSummary(input = {}) {
  const metadata =
    input.metadata &&
    typeof input.metadata === 'object'
      ? input.metadata
      : {};

  return Object.freeze({
    externalEmployerId:
      input.id ||
      input.employerId ||
      input.externalId ||
      null,

    name:
      input.name ||
      input.displayName ||
      input.employerName ||
      'Unnamed employer',

    provider: 'staffology',

    currentTaxYear:
      metadata.currentYear ||
      input.currentYear ||
      null,

    startTaxYear:
      metadata.startYear ||
      input.startYear ||
      null,

    employeeCount:
      Number(
        metadata.employeeCount ??
        input.employeeCount ??
        0
      ),

    archived:
      Boolean(
        metadata.archived ??
        input.archived ??
        false
      ),

    providerUrl:
      input.url ||
      input.href ||
      null,
  });
}

function mapEmployerDetail(input = {}) {
  return Object.freeze({
    externalEmployerId: input.id || null,

    name:
      input.name ||
      input.displayName ||
      'Unnamed employer',

    legalName:
      input.name ||
      input.displayName ||
      null,

    companyNumber:
      input.crn || null,

    provider: 'staffology',

    currentTaxYear:
      input.currentYear || null,

    startTaxYear:
      input.startYear || null,

    employeeCount:
      Number(input.employeeCount || 0),

    subcontractorCount:
      Number(input.subcontractorCount || 0),

    archived:
      Boolean(input.archived),

    address: Object.freeze({
      line1:
        input.address?.line1 || null,

      line2:
        input.address?.line2 || null,

      city:
        input.address?.line3 ||
        input.address?.town ||
        null,

      postcode:
        input.address?.postCode ||
        input.address?.postcode ||
        null,

      country:
        input.address?.country || null,
    }),

    hmrc: Object.freeze({
      payeOfficeNumber:
        input.hmrcDetails?.officeNumber ||
        null,

      payeReference:
        input.hmrcDetails?.payeReference ||
        null,

      accountsOfficeReference:
        input.hmrcDetails
          ?.accountsOfficeReference ||
        null,

      employmentAllowance:
        Boolean(
          input.hmrcDetails
            ?.employmentAllowance
        ),

      quarterlyPaymentSchedule:
        Boolean(
          input.hmrcDetails
            ?.quarterlyPaymentSchedule
        ),

      paymentDateRule:
        input.hmrcDetails
          ?.paymentDateRule ||
        null,
    }),

    payrollDefaults: Object.freeze({
      contractedWeeks:
        Number(
          input.settings
            ?.contractedWeeks ||
          0
        ),

      fullTimeContractedWeeks:
        Number(
          input.settings
            ?.fullTimeContractedWeeks ||
          0
        ),

      fullTimeContractedHours:
        Number(
          input.settings
            ?.fullTimeContractedHours ||
          0
        ),

      allowNegativePay:
        Boolean(
          input.settings?.allowNegativePay
        ),

      groupPayLines:
        Boolean(
          input.settings
            ?.groupPayLinesEnabled
        ),
    }),

    rti: Object.freeze({
      senderType:
        input.rtiSubmissionSettings
          ?.senderType ||
        null,

      autoSubmitFps:
        Boolean(
          input.rtiSubmissionSettings
            ?.autoSubmitFps
        ),

      autoSubmitEps:
        Boolean(
          input.rtiSubmissionSettings
            ?.autoSubmitEps
        ),

      useTestGateway:
        Boolean(
          input.rtiSubmissionSettings
            ?.useTestGateway
        ),

      testInLive:
        Boolean(
          input.rtiSubmissionSettings
            ?.testInLive
        ),
    }),
  });
}


module.exports = {
  splitPayeReference,
  extractItems,
  mapEmployer,
  mapEmployerSummary,
  mapEmployerDetail,
  mapPayOptions,
  mapEmployee,
  applyPayInstruction,
  normaliseJobStatus,
};
