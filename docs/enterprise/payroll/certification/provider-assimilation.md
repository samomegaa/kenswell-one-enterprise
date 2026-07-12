# Enterprise Payroll Provider Assimilation

## Generation Two — Kenswell Tax & Payroll

### Certification Scope

This certification verifies that Kenswell One Enterprise
communicates with the Staffology payroll provider only
through the Enterprise Payroll Manager and its registered
provider boundary.

### Certified Path

Product and application services

→ Enterprise Payroll Manager

→ Payroll Provider Registry

→ Staffology Payroll Provider

→ Staffology Client

→ Live Staffology API

### Certified Capabilities

- Enterprise payroll provider contract
- Provider registry and selection
- Provider manager orchestration
- Live Staffology authentication
- Employer listing
- Employer detail retrieval
- Employee listing
- Employee detail retrieval
- Pay schedule listing
- Canonical response mapping
- Provider-specific payload containment

### Security Boundary

The Staffology API key remains server-side and is loaded
from local environment configuration.

The key is not returned through provider results, committed
to source control, stored in Product Proof data, or exposed
to frontend code.

### Excluded From This Certification

This certification does not yet certify:

- Live employer creation
- Live employee creation
- Live pay schedule configuration
- Live payroll execution
- Payslip generation
- FPS submission
- EPS submission
- NVR submission

These operations require separate controlled write-phase
verification.

### Certification Command

```bash
npm run enterprise:1.1:payroll:verify

Status

ENTERPRISE PAYROLL PROVIDER ASSIMILATION CERTIFIED

The Enterprise Payroll Manager is the sole gateway through
which Kenswell product code communicates with assimilated
payroll providers.
