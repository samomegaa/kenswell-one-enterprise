const fs = require('fs');
const path = require('path');

const STORE_PATH = path.resolve(
  __dirname,
  '../../../data/product-proof/store.json'
);

function readStore() {
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
}

function writeStore(store) {
  const temp = `${STORE_PATH}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(store, null, 2)}\n`);
  fs.renameSync(temp, STORE_PATH);
}

function findEmployer(store, clientId) {
  const engagement = (store.engagements || [])
    .find((item) => item.clientId === clientId);

  return (store.employers || []).find((item) =>
    item.clientId === clientId ||
    item.engagementId === engagement?.id
  );
}

class ProviderEmployerLinkService {
  linkStaffologyEmployer(input = {}) {
    const { clientId, externalEmployerId, employerName } = input;

    if (!clientId || !externalEmployerId) {
      const error = new Error(
        'Client and external employer are required'
      );
      error.statusCode = 400;
      throw error;
    }

    const store = readStore();
    const client = (store.clients || [])
      .find((item) => item.id === clientId);

    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }

    const duplicate = (store.employers || [])
      .find((item) =>
        item.provider?.externalEmployerId === externalEmployerId &&
        item.clientId !== clientId
      );

    if (duplicate) {
      const error = new Error(
        'Staffology employer is already linked'
      );
      error.statusCode = 409;
      throw error;
    }

    const employer = findEmployer(store, clientId);

    if (!employer) {
      const error = new Error(
        'Client has no payroll employer record'
      );
      error.statusCode = 409;
      throw error;
    }

    employer.provider = {
      ...(employer.provider || {}),
      name: 'staffology',
      linked: true,
      externalEmployerId,
      externalEmployerName: employerName || null,
      status: 'connected',
      linkedAt: new Date().toISOString(),
    };

    employer.status = 'active';
    writeStore(store);

    return Object.freeze({
      clientId,
      employerId: employer.id,
      provider: 'staffology',
      externalEmployerId,
      linked: true,
      linkedAt: employer.provider.linkedAt,
    });
  }
}

module.exports = { ProviderEmployerLinkService };
