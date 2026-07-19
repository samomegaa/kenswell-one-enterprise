# Release 1.2 RC2-A Apply Guide

## 1. Back up the H4C sidecar

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise

cp \
  products/tax-payroll/frontend/src/workspaces/providers/EnterpriseRuntimeSidecar.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/EnterpriseRuntimeSidecar.jsx.before-rc2-a
```

## 2. Apply

```bash
unzip -o Kenswell_One_Enterprise_1.2_RC2-A.zip

cp -a \
  Kenswell_One_Enterprise_1.2_RC2-A/. \
  /home/kenswelloneenter/kenswell-one-enterprise/
```

## 3. Add CSS import

```bash
python3 \
  products/tax-payroll/frontend/tools/apply-rc2-a-workspace-experience.py
```

## 4. Verify

```bash
node \
  products/tax-payroll/frontend/review/1.2/RC2/A/verify-enterprise-workspace-experience.mjs
```

## 5. Build

```bash
cd products/tax-payroll/frontend
npm run build
```

## 6. Browser verification

Deploy the generated `dist` through the established frontend
deployment.

In Provider Centre:

1. open the Enterprise runtime;
2. choose an employer containing employees;
3. open an employee workspace;
4. confirm the rich tabbed workspace appears;
5. confirm Summary, Employment, Payroll, Tax, Pension, Leave,
   Provider, Timeline and Audit sections render;
6. use `Back to employees` to return to the runtime list.

## 7. Commit

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise

git add \
  products/tax-payroll/frontend/src/main.jsx \
  products/tax-payroll/frontend/src/workspaces/employees/runtimeEmployeeAdapter.js \
  products/tax-payroll/frontend/src/workspaces/employees/RuntimeEmployeeWorkspace.jsx \
  products/tax-payroll/frontend/src/workspaces/employees/runtime-employee-workspace.css \
  products/tax-payroll/frontend/src/workspaces/providers/EnterpriseRuntimeSidecar.jsx \
  products/tax-payroll/frontend/tools/apply-rc2-a-workspace-experience.py \
  products/tax-payroll/frontend/review/1.2/RC2/A \
  docs/enterprise/1.2-RC2-A-enterprise-workspace-experience.md

git diff --cached --name-status
git diff --cached --stat

git commit -m \
  "feat(frontend): add enterprise workspace experience"
```

Do not stage the `.before-rc2-a` backup.
