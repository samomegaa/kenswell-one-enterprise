# Version 2.5-R2.5 Operating Guide

Run from the extracted release package:

```bash
bash APPLY.sh
bash VERIFY.sh
bash CERTIFY.sh
```

Installed frontend files:

```text
products/tax-payroll/frontend/src/services/employee-enterprise-api.js
products/tax-payroll/frontend/src/runtime/useEnterpriseEmployeeRuntime.js
```

Updated file:

```text
products/tax-payroll/frontend/src/runtime/index.js
```

Private backup:

```text
review/2.5/R2.5/backups/runtime-index.js.before-r2.5
```

After certification, build the frontend:

```bash
cd ~/kenswell-one-enterprise/products/tax-payroll/frontend
npm run build
```

Review:

```bash
cd ~/kenswell-one-enterprise

sed -n '1,260p'   review/2.5/R2.5/CERTIFICATION.md

git diff --   products/tax-payroll/frontend/src/runtime/index.js

sed -n '1,260p'   products/tax-payroll/frontend/src/services/employee-enterprise-api.js

sed -n '1,260p'   products/tax-payroll/frontend/src/runtime/useEnterpriseEmployeeRuntime.js
```
