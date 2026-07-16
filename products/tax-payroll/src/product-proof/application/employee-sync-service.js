const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const {
  getEnterprisePayrollPlatform,
} = require('./enterprise-payroll-runtime');

const STORE_PATH = path.resolve(
  __dirname,
  '../../../data/product-proof/store.json'
);

function readStore() {
  return JSON.parse(
    fs.readFileSync(STORE_PATH, 'utf8')
  );
}

function writeStore(store) {
  const temporaryPath = `${STORE_PATH}.tmp`;

  fs.writeFileSync(
    temporaryPath,
    `${JSON.stringify(store, null, 2)}\n`,
    'utf8'
  );

  fs.renameSync(
    temporaryPath,
    STORE_PATH
  );
}

function extractEmployees(result) {
  if (Array.isArray(result)) {
    return result;
  }

  return (
    result.employees ||
    result.items ||
    result.result?.employees ||
    result.result?.items ||
    result.data?.employees ||
    result.data?.items ||
    []
  );
}

function mapEmployee(employee, context) {
  const firstName =
    employee.firstName ||
    employee.givenName ||
    '';

  const lastName =
    employee.lastName ||
    employee.surname ||
    '';

  return {
    clientId: context.clientId,
    employerId: context.employerId,
    externalEmployeeId:
      employee.externalEmployeeId ||
      employee.employeeRef ||
      employee.id,
    payrollCode:
      employee.payrollCode ||
      employee.payrollNumber ||
      employee.code ||
      null,
    firstName,
    lastName,
    displayName:
      employee.displayName ||
      employee.fullName ||
      employee.name ||
      [firstName, lastName]
        .filter(Boolean)
        .join(' ') ||
      'Unnamed employee',
    status:
      employee.status ||
      (employee.archived
        ? 'archived'
        : 'active'),
    provider: {
      name: 'staffology',
      externalEmployerId:
        context.externalEmployerId,
    },
    lastSynchronisedAt:
      context.synchronisedAt,
  };
}

class EmployeeSyncService {
  async synchronise(clientId) {
    const store = readStore();

    const employer =
      (store.employers || []).find(
        (item) =>
          item.clientId === clientId &&
          item.provider?.linked === true &&
          item.provider?.externalEmployerId
      );

    if (!employer) {
      const error = new Error(
        'Client has no linked payroll employer'
      );
      error.statusCode = 409;
      throw error;
    }

    const platform =
      getEnterprisePayrollPlatform();

    const health =
      await platform.manager.checkHealth(
        'staffology'
      );

    if (health.available !== true) {
      const error = new Error(
        health.message ||
        'Staffology provider is unavailable'
      );
      error.statusCode = 502;
      throw error;
    }

    const result =
      await platform.manager.listEmployees({
        provider: 'staffology',
        employerRef:
          employer.provider
            .externalEmployerId,
      });

    const synchronisedAt =
      new Date().toISOString();

    const incoming =
      extractEmployees(result).map(
        (employee) =>
          mapEmployee(employee, {
            clientId,
            employerId: employer.id,
            externalEmployerId:
              employer.provider
                .externalEmployerId,
            synchronisedAt,
          })
      );

    store.employees =
      store.employees || [];

    let created = 0;
    let updated = 0;

    for (const employee of incoming) {
      const existing =
        store.employees.find(
          (item) =>
            item.employerId ===
              employer.id &&
            item.externalEmployeeId ===
              employee.externalEmployeeId
        );

      if (existing) {
        Object.assign(existing, employee);
        updated += 1;
      } else {
        store.employees.push({
          id: `employee_${crypto.randomUUID()}`,
          ...employee,
          createdAt: synchronisedAt,
        });
        created += 1;
      }
    }

    employer.employeeCount =
      store.employees.filter(
        (item) =>
          item.employerId === employer.id &&
          item.status !== 'archived'
      ).length;

    employer.provider.lastSynchronisedAt =
      synchronisedAt;

    writeStore(store);

    return Object.freeze({
      clientId,
      employerId: employer.id,
      received: incoming.length,
      created,
      updated,
      employeeCount:
        employer.employeeCount,
      synchronisedAt,
    });
  }

  list(clientId) {
    if (!clientId) {
      const error = new Error(
        'Client is required'
      );

      error.statusCode = 400;
      throw error;
    }

    const store = readStore();

    const employer =
      (store.employers || []).find(
        (item) =>
          item.clientId === clientId &&
          item.provider?.linked === true &&
          item.provider
            ?.externalEmployerId
      );

    if (!employer) {
      return Object.freeze({
        clientId,
        linked: false,
        count: 0,
        employees: Object.freeze([]),
        lastSynchronisedAt: null,
      });
    }

    const employees =
      (store.employees || []).filter(
        (item) =>
          item.employerId ===
          employer.id
      );

    return Object.freeze({
      clientId,
      linked: true,
      employerId: employer.id,

      externalEmployerId:
        employer.provider
          .externalEmployerId,

      count: employees.length,

      employees: Object.freeze(
        employees
      ),

      lastSynchronisedAt:
        employer.provider
          .lastSynchronisedAt ||
        null,
    });
  }
}

module.exports = {
  EmployeeSyncService,
  STORE_PATH,
  extractEmployees,
  mapEmployee,
};
