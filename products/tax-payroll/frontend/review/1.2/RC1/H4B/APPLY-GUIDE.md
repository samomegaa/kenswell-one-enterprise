# RC1-H4B Apply Guide

H4B adds employer-scoped employee discovery and workspace launching.
It is additive and does not modify `App.jsx` or the active route tree.

## 1. Apply the package

From the repository root:

```bash
unzip -o Kenswell_One_Enterprise_1.2_RC1-H4B.zip

cp -a \
  Kenswell_One_Enterprise_1.2_RC1-H4B/. \
  /home/kenswelloneenter/kenswell-one-enterprise/
```

## 2. Verify package contents

```bash
node \
  products/tax-payroll/frontend/review/1.2/RC1/H4B/verify-employee-runtime-foundation.mjs
```

Expected:

```text
PASS  Employee runtime context
PASS  Employer-scoped employee discovery
PASS  Employee selection persistence
PASS  Workspace runtime launcher

✅ RC1-H4B Employee Runtime Foundation passed
```

## 3. Build the frontend

```bash
cd products/tax-payroll/frontend
npm run build
```

H4B is additive. The existing application should continue to build
before H4C mounts the Enterprise runtime and routes.

## 4. Commit only H4B

Return to the repository root:

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise
```

```bash
git add \
  products/tax-payroll/frontend/src/runtime \
  products/tax-payroll/frontend/src/workspaces/employees/EmployeeRuntimeGuard.jsx \
  products/tax-payroll/frontend/src/workspaces/employees/EmployeeList.jsx \
  products/tax-payroll/frontend/src/workspaces/employees/EmployeeWorkspaceLauncher.jsx \
  products/tax-payroll/frontend/src/workspaces/employees/useEmployeeWorkspaceRuntime.js \
  products/tax-payroll/frontend/src/workspaces/employees/employee-runtime.css \
  products/tax-payroll/frontend/review/1.2/RC1/H4B \
  docs/enterprise/1.2-RC1-H4B-employee-runtime-workspace-launcher.md
```

```bash
git diff --cached --name-status
git diff --cached --stat
```

```bash
git commit -m \
  "feat(frontend): add employee runtime and workspace launcher"
```
