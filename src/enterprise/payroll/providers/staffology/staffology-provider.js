const {
  EnterprisePayrollProvider,
} = require('../../payroll-provider');

const {
  PayrollCapability,
  PayrollProviderMode,
} = require('../../payroll-types');

const {
  StaffologyClient,
} = require('./staffology-client');

const {
  extractItems,
  mapEmployer,
  mapEmployerSummary,
  mapEmployerDetail,
  mapEmployee,
  mapEmployeeSummary,
  mapEmployeeDetail,
  mapPayOptions,
  applyPayInstruction,
  normaliseJobStatus,
} = require('./staffology-mappers');

const {
  StaffologySafetyError,
  StaffologyValidationError,
} = require('./staffology-errors');

class StaffologyPayrollProvider
  extends EnterprisePayrollProvider {
  constructor({
    client = null,
    baseUrl,
    apiKey,
    username = 'api',
    timeoutMs = 30000,
    mode = PayrollProviderMode.TEST,
    metadata = {},
  } = {}) {
    super({
      name: 'staffology',
      displayName: 'Staffology Payroll',
      mode,
      capabilities: [
        PayrollCapability.EMPLOYERS,
        PayrollCapability.PAY_SCHEDULES,
        PayrollCapability.EMPLOYEES,
        PayrollCapability.PAY_INSTRUCTIONS,
        PayrollCapability.PAYROLL_CALCULATION,
        PayrollCapability.FPS,
        PayrollCapability.EPS,
        PayrollCapability.NVR,
        PayrollCapability.JOB_STATUS,
      ],
      metadata: {
        vendor: 'Staffology',
        apiFirst: true,
        ukPayroll: true,
        rti: true,
        ...metadata,
      },
    });

    this.client = client || new StaffologyClient({
      baseUrl,
      apiKey,
      username,
      timeoutMs,
    });
  }

  async healthCheck() {
    try {
      await this.client.get('/employers');

      return Object.freeze({
        provider: this.name,
        available: true,
        checkedAt: new Date().toISOString(),
      });
    } catch (error) {
      return Object.freeze({
        provider: this.name,
        available: false,
        error: error.message,
        checkedAt: new Date().toISOString(),
      });
    }
  }

  async listEmployers(input = {}) {
    const path =
      input.bureau === true
        ? '/bureau/employers'
        : '/employers';

    const payload =
      await this.client.get(path);

    const employers =
      extractItems(payload)
        .map(mapEmployerSummary);

    return Object.freeze({
      provider: this.name,
      count: employers.length,
      employers: Object.freeze(employers),
      retrievedAt: new Date().toISOString(),
    });
  }

  async getEmployer(input = {}) {
    const employerRef =
      typeof input === 'string'
        ? input
        : (
          input.employerRef ||
          input.externalEmployerId ||
          input.id
        );

    if (
      !employerRef ||
      typeof employerRef !== 'string'
    ) {
      throw new StaffologyValidationError(
        'Staffology employer reference is required'
      );
    }

    const data = await this.client.get(
      `/employers/${employerRef}`
    );

    return Object.freeze({
      provider: this.name,
      employer: mapEmployerDetail(data),
      retrievedAt: new Date().toISOString(),
    });
  }

  async createEmployer(input = {}) {
    const data = await this.client.post(
      '/employers',
      mapEmployer(input)
    );

    return Object.freeze({
      externalEmployerId:
        data.id || data.metadata?.id,
      raw: data,
    });
  }

  async createPaySchedule(input = {}) {
    const {
      employerRef,
      taxYear: requestedTaxYear,
      frequency = 'Monthly',
      firstPeriodEndDate,
      firstPaymentDate = firstPeriodEndDate,
    } = input;

    const employer = await this.client.get(
      `/employers/${employerRef}`
    );

    const taxYear =
      requestedTaxYear ||
      employer.currentYear ||
      'Year2025';

    const data = await this.client.put(
      `/employers/${employerRef}` +
      `/schedules/${taxYear}/${frequency}/1`,
      {
        firstPeriodEndDate,
        firstPaymentDate,
      }
    );

    return Object.freeze({
      externalScheduleId: `${taxYear}:${frequency}`,
      taxYear,
      frequency,
      configured: data.isConfigured ?? null,
      raw: data,
    });
  }

  async listEmployees(input = {}) {
    const employerRef =
      typeof input === 'string'
        ? input
        : (
          input.employerRef ||
          input.externalEmployerId ||
          input.employerId
        );

    if (
      !employerRef ||
      typeof employerRef !== 'string'
    ) {
      throw new StaffologyValidationError(
        'Staffology employer reference is required'
      );
    }

    const payload = await this.client.get(
      `/employers/${employerRef}/employees`
    );

    const employees =
      extractItems(payload)
        .map(mapEmployeeSummary);

    return Object.freeze({
      provider: this.name,
      employerRef,
      count: employees.length,
      employees: Object.freeze(employees),
      retrievedAt: new Date().toISOString(),
    });
  }

  async getEmployee(input = {}) {
    const employerRef =
      input.employerRef ||
      input.externalEmployerId ||
      input.employerId;

    const employeeRef =
      input.employeeRef ||
      input.externalEmployeeId ||
      input.employeeId ||
      input.id;

    if (
      !employerRef ||
      typeof employerRef !== 'string'
    ) {
      throw new StaffologyValidationError(
        'Staffology employer reference is required'
      );
    }

    if (
      !employeeRef ||
      typeof employeeRef !== 'string'
    ) {
      throw new StaffologyValidationError(
        'Staffology employee reference is required'
      );
    }

    const data = await this.client.get(
      `/employers/${employerRef}` +
      `/employees/${employeeRef}`
    );

    return Object.freeze({
      provider: this.name,
      employerRef,
      employee: mapEmployeeDetail(data),
      retrievedAt: new Date().toISOString(),
    });
  }

  async createEmployee(input = {}) {
    const {
      employerRef,
      employee,
    } = input;

    const data = await this.client.post(
      `/employers/${employerRef}/employees`,
      mapEmployee(employee || input)
    );

    return Object.freeze({
      externalEmployeeId: data.id,
      raw: data,
    });
  }

  async upsertPayInstruction(input = {}) {
    const {
      employerRef,
      employeeRef,
      instruction,
    } = input;

    const path =
      `/employers/${employerRef}` +
      `/employees/${employeeRef}`;

    const employee = await this.client.get(path);

    const currentPayOptions =
      employee.payOptions ||
      mapPayOptions({});

    const payOptions = applyPayInstruction(
      currentPayOptions,
      instruction
    );

    const data = await this.client.put(path, {
      ...employee,
      payOptions,
    });

    return Object.freeze({
      externalInstructionId:
        `${employeeRef}:pay-options`,
      raw: data,
    });
  }

  async runPayroll(input = {}) {
    const {
      employerRef,
      payScheduleRef,
    } = input;

    let [taxYear, payPeriod] =
      String(payScheduleRef).split(':');

    const employer = await this.client.get(
      `/employers/${employerRef}`
    );

    if (
      employer.currentYear &&
      employer.currentYear !== taxYear
    ) {
      taxYear = employer.currentYear;
    }

    const data = await this.client.post(
      `/employers/${employerRef}` +
      `/payrun/${taxYear}/${payPeriod}`,
      {}
    );

    const periodNumber =
      data.period ??
      data.metadata?.periodNumber ??
      data.periodNumber;

    return Object.freeze({
      jobRef:
        `payrun:${employerRef}:${taxYear}:` +
        `${payPeriod}:${periodNumber}`,
      status: 'complete',
      externalPayRunId: data.id || null,
      taxYear,
      payPeriod,
      periodNumber,
      totals: Object.freeze({
        ...(data.totals || {}),
      }),
      raw: data,
    });
  }

  async getRtiSettings(employerRef) {
    const employer = await this.client.get(
      `/employers/${employerRef}`
    );

    return employer.rtiSubmissionSettings || {};
  }

  async enableRtiTestMode(
    employerRef,
    credentials = {}
  ) {
    const employer = await this.client.get(
      `/employers/${employerRef}`
    );

    const current =
      employer.rtiSubmissionSettings || {};

    const rtiSubmissionSettings = {
      ...current,
      useTestGateway: true,
      testInLive: true,

      ...(credentials.senderId
        ? { senderId: credentials.senderId }
        : {}),

      ...(credentials.password
        ? { password: credentials.password }
        : {}),
    };

    await this.client.put(
      `/employers/${employerRef}`,
      {
        ...employer,
        rtiSubmissionSettings,
      }
    );

    return Object.freeze({
      ...rtiSubmissionSettings,
    });
  }

  async isRtiTestMode(employerRef) {
    const settings = await this.getRtiSettings(
      employerRef
    );

    return Boolean(
      settings.useTestGateway ||
      settings.testInLive
    );
  }

  async finalisePayRun(input = {}) {
    const {
      employerRef,
      taxYear,
      payPeriod,
      periodNumber,
      reason = null,
    } = input;

    const body = {
      state: 'Finalised',
      ...(reason ? { reason } : {}),
    };

    try {
      return await this.client.put(
        `/employers/${employerRef}` +
        `/payrun/${taxYear}/${payPeriod}` +
        `/${periodNumber}`,
        body
      );
    } catch (error) {
      const message = String(
        error.body?.error ||
        error.body?.message ||
        ''
      );

      if (/from Finalised to Finalised/i.test(message)) {
        return Object.freeze({
          state: 'Finalised',
          alreadyFinalised: true,
        });
      }

      throw error;
    }
  }

  submitFps(input = {}) {
    return this.submitRti('fps', input);
  }

  submitEps(input = {}) {
    return this.submitRti('eps', input);
  }

  submitNvr(input = {}) {
    return this.submitRti('nvr', input);
  }

  async submitRti(type, input = {}) {
    const {
      employerRef,
      taxYear,
      payPeriod,
      periodNumber,
      allowLiveSubmission = false,
    } = input;

    if (
      taxYear &&
      payPeriod &&
      periodNumber !== undefined &&
      periodNumber !== null
    ) {
      await this.finalisePayRun({
        employerRef,
        taxYear,
        payPeriod,
        periodNumber,
      });
    }

    const yearPath =
      `/employers/${employerRef}` +
      `/rti/${type}/${taxYear}`;

    let docId = input.docId || null;

    if (!docId) {
      const listing = await this.client.get(yearPath);
      const documents = Array.isArray(listing)
        ? listing
        : listing.items || [];

      docId = documents.at(-1)?.id || null;
    }

    if (!docId) {
      throw new StaffologyValidationError(
        `No ${type.toUpperCase()} document was found`,
        {
          employerRef,
          taxYear,
          periodNumber,
        }
      );
    }

    if (!allowLiveSubmission) {
      const testMode = await this.isRtiTestMode(
        employerRef
      );

      if (!testMode) {
        throw new StaffologySafetyError(
          `Refusing live ${type.toUpperCase()} submission`,
          {
            employerRef,
            taxYear,
            docId,
            instruction:
              'Enable RTI test mode or explicitly allow live submission',
          }
        );
      }
    }

    try {
      const submission = await this.client.post(
        `${yearPath}/${docId}/submit`,
        {}
      );

      return Object.freeze({
        jobRef:
          `${type}:${employerRef}:${taxYear}:${docId}`,
        status: 'submitting',
        submissionType: type,
        documentId: docId,
        raw: submission,
      });
    } catch (error) {
      const message = String(
        error.body?.error ||
        error.body?.message ||
        ''
      );

      if (/validation warning/i.test(message)) {
        const document = await this.client.get(
          `${yearPath}/${docId}`
        ).catch(() => ({}));

        throw new StaffologyValidationError(
          `${type.toUpperCase()} contains unresolved validation warnings`,
          {
            employerRef,
            taxYear,
            docId,
            validationWarnings:
              document.validationWarnings || [],
          }
        );
      }

      throw error;
    }
  }

  async getJob(input = {}) {
    const jobRef =
      typeof input === 'string'
        ? input
        : input.jobRef;

    const parts = String(jobRef).split(':');
    const kind = parts[0];

    if (kind === 'payrun') {
      return Object.freeze({
        status: 'complete',
        result: Object.freeze({ jobRef }),
      });
    }

    const employerRef = parts[1];
    const taxYear = parts[2];
    const docId = parts[3];

    try {
      const data = await this.client.get(
        `/employers/${employerRef}` +
        `/rti/${kind}/${taxYear}/${docId}`
      );

      const status = normaliseJobStatus(
        data.i18nStatus ||
        data.status ||
        data.onlineFiling?.status
      );

      return Object.freeze({
        status,
        result: data,
      });
    } catch {
      return Object.freeze({
        status: 'processing',
        result: Object.freeze({
          note: 'submission is not yet queryable',
        }),
      });
    }
  }
}

function createStaffologyPayrollProvider(options = {}) {
  return new StaffologyPayrollProvider(options);
}

module.exports = {
  StaffologyPayrollProvider,
  createStaffologyPayrollProvider,
};
