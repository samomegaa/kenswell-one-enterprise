const models = require('../../database/models');

const ClientRepository = require('./ClientRepository');
const PortalAccountRepository = require('./PortalAccountRepository');
const PortalMatterRepository = require('./PortalMatterRepository');
const PortalDocumentRepository = require('./PortalDocumentRepository');
const PortalMessageRepository = require('./PortalMessageRepository');

module.exports = {
  clientRepository: new ClientRepository(models),
  portalAccountRepository: new PortalAccountRepository(models),
  portalMatterRepository: new PortalMatterRepository(models),
  portalDocumentRepository: new PortalDocumentRepository(models),
  portalMessageRepository: new PortalMessageRepository(models),
};
