const ClientPortalService = require('./ClientPortalService');
const PortalAccountService = require('./PortalAccountService');
const PortalMatterService = require('./PortalMatterService');
const PortalDocumentService = require('./PortalDocumentService');
const PortalMessageService = require('./PortalMessageService');

module.exports = {
  clientPortalService: new ClientPortalService(),
  portalAccountService: new PortalAccountService(),
  portalMatterService: new PortalMatterService(),
  portalDocumentService: new PortalDocumentService(),
  portalMessageService: new PortalMessageService(),
};
