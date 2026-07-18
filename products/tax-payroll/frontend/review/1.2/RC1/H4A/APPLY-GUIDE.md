# RC1-H4A Apply Guide

RC1-H4 is delivered in three packages:

1. H4A — Employer Runtime Foundation
2. H4B — Employee Discovery and Workspace Launcher
3. H4C — Provider Centre and React Route Integration

H4A is additive and does not yet modify `App.jsx`.

## 1. Apply the package

From the repository root:

```bash
unzip -o Kenswell_One_Enterprise_1.2_RC1-H4A.zip

cp -a \
  Kenswell_One_Enterprise_1.2_RC1-H4A/. \
  /home/kenswelloneenter/kenswell-one-enterprise/
```

## 2. Verify package contents

```bash
node \
  products/tax-payroll/frontend/review/1.2/RC1/H4A/verify-employer-runtime-foundation.mjs
```

Expected:

```text
PASS  Enterprise runtime API
PASS  Employer runtime context
PASS  Employer selection persistence
PASS  Employer selector foundation

✅ RC1-H4A Employer Runtime Foundation passed
```

## 3. Build the frontend

```bash
cd products/tax-payroll/frontend
npm run build
```

Because H4A is additive, the existing application should continue to
build before the provider is mounted.

## 4. Commit only H4A

Return to the repository root:

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise
```

```bash
git add \
  products/tax-payroll/frontend/src/services/enterprise-runtime-api.js \
  products/tax-payroll/frontend/src/runtime \
  products/tax-payroll/frontend/src/workspaces/providers/EmployerRuntimeGuard.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/EmployerSelector.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/employer-runtime.css \
  products/tax-payroll/frontend/review/1.2/RC1/H4A \
  docs/enterprise/1.2-RC1-H4A-employer-runtime-foundation.md
```

```bash
git diff --cached --name-status
git diff --cached --stat
```

```bash
git commit -m \
  "feat(frontend): add employer runtime foundation"
```
