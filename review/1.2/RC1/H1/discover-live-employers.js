'use strict';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path:path.resolve(__dirname,'../../../../.env.local') });
const { StaffologyClient } = require('../../../../src/enterprise/payroll/providers/staffology/staffology-client');
const { StaffologyEmployerDirectory } = require('../../../../src/enterprise/employers');
async function main() {
  const client = new StaffologyClient({
    baseUrl:process.env.STAFFOLOGY_BASE_URL,
    username:process.env.STAFFOLOGY_API_USERNAME || process.env.STAFFOLOGY_USERNAME || 'api',
    apiKey:process.env.STAFFOLOGY_API_KEY,
  });
  const directory = new StaffologyEmployerDirectory({ client });
  const employers = await directory.list();
  console.log(JSON.stringify({ count:employers.length, employers:employers.map(({ raw, ...employer })=>employer) },null,2));
}
main().catch((error)=>{ console.error(error); process.exitCode=1; });
