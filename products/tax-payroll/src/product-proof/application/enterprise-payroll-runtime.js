const {
  PayrollProviderMode,
  createEnterprisePayrollPlatform,
  staffology,
} = require('../../../../../src/enterprise/payroll');

let platform = null;

function getEnterprisePayrollPlatform() {
  if (platform) {
    return platform;
  }

  const provider =
    staffology.createStaffologyPayrollProvider({
      apiKey: String(
        process.env.STAFFOLOGY_API_KEY || ''
      ).trim(),
      baseUrl:
        process.env.STAFFOLOGY_BASE_URL ||
        'https://api.staffology.co.uk',
      username:
        process.env.STAFFOLOGY_API_USERNAME ||
        'api',
      mode: PayrollProviderMode.LIVE,
    });

  platform = createEnterprisePayrollPlatform({
    providers: [provider],
    defaultProvider: 'staffology',
  });

  return platform;
}

module.exports = {
  getEnterprisePayrollPlatform,
};
