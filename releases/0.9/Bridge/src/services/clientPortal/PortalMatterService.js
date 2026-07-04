const {
  portalMatterRepository,
} = require('../../repositories/clientPortal');

class PortalMatterService {
  async shareMatterWithClient(data) {
    return portalMatterRepository.create({
      ...data,
      status: data.status || 'open',
    });
  }

  async getMatterById(portalMatterId) {
    return portalMatterRepository.findById(portalMatterId);
  }

  async getMatterByMatterId(matterId) {
    return portalMatterRepository.findByMatterId(matterId);
  }

  async listClientMatters(clientId) {
    return portalMatterRepository.findByClientId(clientId);
  }

  async listOpenClientMatters(clientId) {
    return portalMatterRepository.findOpenByClientId(clientId);
  }

  async closeMatter(portalMatterId) {
    return portalMatterRepository.update(portalMatterId, {
      status: 'completed',
    });
  }

  async archiveMatter(portalMatterId) {
    return portalMatterRepository.update(portalMatterId, {
      status: 'archived',
    });
  }
}

module.exports = PortalMatterService;
