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



function mapEmployeeSummary(input = {}) {
  const metadata =
    input.metadata &&
    typeof input.metadata === 'object'
      ? input.metadata
      : {};

  return Object.freeze({
    externalEmployeeId:
      input.id ||
      input.employeeId ||
      input.externalId ||
      null,

    fullName:
      input.name ||
      input.displayName ||
      [
        input.personalDetails?.firstName,
        input.personalDetails?.lastName,
      ]
        .filter(Boolean)
        .join(' ') ||
      'Unnamed employee',

    provider: 'staffology',

    payrollCode:
      metadata.payrollCode ||
      input.employmentDetails?.payrollCode ||
      null,

    status:
      metadata.status ||
      input.status ||
      null,

    taxCode:
      metadata.taxCode ||
      input.payOptions?.taxAndNi?.taxCode ||
      null,

    nationalInsuranceTable:
      metadata.niTable ||
      input.payOptions?.taxAndNi?.niTable ||
      null,

    payPeriod:
      metadata.period ||
      input.payOptions?.period ||
      null,

    payScheduleName:
      metadata.payScheduleName ||
      null,

    basicPay:
      Number(
        metadata.basicPay ??
        input.payOptions?.basicPay ??
        input.payOptions?.payAmount ??
        0
      ),

    email:
      metadata.email ||
      input.personalDetails?.email ||
      null,

    isDirector:
      Boolean(
        metadata.isDirector ??
        input.employmentDetails?.isDirector ??
        false
      ),

    providerUrl:
      input.url ||
      input.href ||
      null,
  });
}

function mapEmployeeDetail(input = {}) {
  const personal =
    input.personalDetails || {};

  const employment =
    input.employmentDetails || {};

  const payOptions =
    input.payOptions || {};

  const taxAndNi =
    payOptions.taxAndNi || {};

  const fpsFields =
    payOptions.fpsFields || {};

  const starter =
    employment.starterDetails || {};

  return Object.freeze({
    externalEmployeeId:
      input.id || null,

    provider: 'staffology',

    fullName:
      input.name ||
      input.displayName ||
      [
        personal.title,
        personal.firstName,
        personal.lastName,
      ]
        .filter(Boolean)
        .join(' ') ||
      'Unnamed employee',

    personal: Object.freeze({
      title:
        personal.title || null,

      firstName:
        personal.firstName || null,

      lastName:
        personal.lastName || null,

      dateOfBirth:
        personal.dateOfBirth || null,

      email:
        personal.email || null,

      address: Object.freeze({
        line1:
          personal.address?.line1 || null,

        line2:
          personal.address?.line2 || null,

        city:
          personal.address?.line3 ||
          personal.address?.town ||
          null,

        postcode:
          personal.address?.postCode ||
          personal.address?.postcode ||
          null,

        country:
          personal.address?.country || null,
      }),
    }),

    employment: Object.freeze({
      payrollCode:
        employment.payrollCode || null,

      startDate:
        starter.startDate || null,

      starterDeclaration:
        starter.starterDeclaration || null,

      onHold:
        Boolean(employment.onHold),

      isApprentice:
        Boolean(employment.isApprentice),

      workingPattern:
        employment.workingPattern || null,

      isWorkingInFreePort:
        Boolean(
          employment.isWorkingInFreePort
        ),

      isWorkingInInvestmentZone:
        Boolean(
          employment.isWorkingInInvestmentZone
        ),
    }),

    payroll: Object.freeze({
      period:
        payOptions.period || null,

      basis:
        payOptions.basis || null,

      method:
        payOptions.method || null,

      basicPay:
        Number(
          payOptions.basicPay ??
          payOptions.payAmount ??
          0
        ),

      payAmount:
        Number(
          payOptions.payAmount ?? 0
        ),

      baseHourlyRate:
        Number(
          payOptions.baseHourlyRate ?? 0
        ),

      baseDailyRate:
        Number(
          payOptions.baseDailyRate ?? 0
        ),

      autoAdjustForLeave:
        Boolean(
          payOptions.autoAdjustForLeave
        ),

      regularPayLines: Object.freeze(
        Array.isArray(
          payOptions.regularPayLines
        )
          ? payOptions.regularPayLines.map(
              (line) =>
                Object.freeze({ ...line })
            )
          : []
      ),
    }),

    tax: Object.freeze({
      taxCode:
        taxAndNi.taxCode || null,

      nationalInsuranceTable:
        taxAndNi.niTable || null,

      week1Month1:
        Boolean(taxAndNi.week1Month1),

      studentLoan:
        taxAndNi.studentLoan || null,

      postgraduateLoan:
        Boolean(taxAndNi.postgradLoan),

      secondaryClass1NotPayable:
        Boolean(
          taxAndNi.secondaryClass1NotPayable
        ),

      foreignTaxCredit:
        Boolean(
          taxAndNi.foreignTaxCredit
        ),
    }),

    rti: Object.freeze({
      offPayrollWorker:
        Boolean(fpsFields.offPayrollWorker),

      irregularPaymentPattern:
        Boolean(
          fpsFields.irregularPaymentPattern
        ),

      nonIndividual:
        Boolean(fpsFields.nonIndividual),

      excludeFromRtiSubmissions:
        Boolean(
          fpsFields.excludeFromRtiSubmissions
        ),

      hoursNormallyWorked:
        fpsFields.hoursNormallyWorked || null,
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
  mapEmployeeSummary,
  mapEmployeeDetail,
  applyPayInstruction,
  normaliseJobStatus,
};
