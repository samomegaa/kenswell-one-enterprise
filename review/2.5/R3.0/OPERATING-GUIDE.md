# Version 2.5-R3.0 Operating Guide

Run from the extracted package:

```bash
bash APPLY.sh
bash VERIFY.sh
bash CERTIFY.sh
```

Then build the frontend:

```bash
cd ~/kenswell-one-enterprise/products/tax-payroll/frontend
npm run build
```

Review:

```bash
cd ~/kenswell-one-enterprise

sed -n '1,240p' review/2.5/R3.0/CERTIFICATION.md

find src/enterprise/employees/commands -maxdepth 1 -type f -print | sort

find   products/tax-payroll/frontend/src/workspaces/employees/editing/runtime   -maxdepth 1 -type f -print | sort
```
