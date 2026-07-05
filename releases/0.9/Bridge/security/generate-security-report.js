const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const resultsDir = path.join(root, 'security/results');
const reportFile = path.join(root, 'security/SECURITY-VALIDATION-REPORT.md');

function readJson(name) {
  const full = path.join(resultsDir, name);
  if (!fs.existsSync(full)) return null;

  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch {
    return null;
  }
}

const secretScan = readJson('secret-scan-results.json');
const routeReview = readJson('route-exposure-review.json');
const npmAudit = readJson('npm-audit-results.json');

const lines = [
  '# RC3-B — Security Validation Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Secret Scan',
  '',
];

if (secretScan) {
  lines.push(`Findings: ${secretScan.findings.length}`);
} else {
  lines.push('Secret scan results not available.');
}

lines.push('', '## Route Exposure Review', '');

if (routeReview) {
  lines.push(`Route files reviewed: ${routeReview.files.length}`);
  lines.push(`Warnings: ${routeReview.warnings.length}`);
} else {
  lines.push('Route exposure review results not available.');
}

lines.push('', '## Dependency Audit', '');

if (npmAudit?.metadata?.vulnerabilities) {
  lines.push('```json');
  lines.push(JSON.stringify(npmAudit.metadata.vulnerabilities, null, 2));
  lines.push('```');
} else {
  lines.push('Dependency audit results not available or not parseable.');
}

lines.push(
  '',
  '## Security Controls Reviewed',
  '',
  '- Security headers',
  '- CORS policy',
  '- Request IDs',
  '- Rate limiting',
  '- Error response standardisation',
  '- Route inventory',
  '- Environment validation',
  '- Secret leakage baseline',
  '',
  '## Recommendations',
  '',
  '- Replace in-memory rate limiting with Redis-backed rate limiting before multi-instance production.',
  '- Run a full external vulnerability scan before 0.9.0 GA.',
  '- Run dependency audit in CI and fail on high/critical vulnerabilities before GA.',
  '- Add authentication/authorisation integration tests.',
  '- Review file upload storage provider before production file handling.',
  ''
);

fs.writeFileSync(reportFile, lines.join('\n'));

console.log('Security validation report generated');
console.log(`Report: ${reportFile}`);
