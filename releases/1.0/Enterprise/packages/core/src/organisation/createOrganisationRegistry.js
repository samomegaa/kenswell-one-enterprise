const OrganisationRegistry = require('./OrganisationRegistry');

function createOrganisationRegistry({ organisations = [] } = {}) {
  return new OrganisationRegistry({ organisations });
}

module.exports = createOrganisationRegistry;
