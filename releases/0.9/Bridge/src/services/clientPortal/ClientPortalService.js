const {
  clientRepository,
  portalAccountRepository,
  portalMatterRepository,
  portalDocumentRepository,
  portalMessageRepository,
} = require('../../repositories/clientPortal');

class ClientPortalService {
  async createClient(data) {
    const client = await clientRepository.create({
      ...data,
      email: String(data.email).toLowerCase(),
    });

    return client;
  }

  async getClientById(clientId) {
    return clientRepository.findById(clientId);
  }

  async getClientByEmail(firmId, email) {
    return clientRepository.findByEmail(firmId, email);
  }

  async listFirmClients(firmId) {
    return clientRepository.findByFirm(firmId);
  }

  async searchClients(firmId, searchTerm) {
    return clientRepository.searchByName(firmId, searchTerm);
  }

  async getClientPortalOverview(clientId) {
    const [client, account, matters, documents, messages] = await Promise.all([
      clientRepository.findById(clientId),
      portalAccountRepository.findByClientId(clientId),
      portalMatterRepository.findByClientId(clientId),
      portalDocumentRepository.findByClientId(clientId),
      portalMessageRepository.findByClientId(clientId),
    ]);

    return {
      client,
      account,
      matters,
      documents,
      messages,
    };
  }
}

module.exports = ClientPortalService;
