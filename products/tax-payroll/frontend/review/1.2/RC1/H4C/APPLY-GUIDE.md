# RC1-H4C Reworked Integration Apply Guide

This release patches the existing Provider Centre instead of replacing
it.

## 1. Back up the two patched files

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise

cp \
  products/tax-payroll/frontend/src/workspaces/providers/ProviderCentre.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/ProviderCentre.jsx.before-rc1-h4c

cp \
  products/tax-payroll/frontend/src/main.jsx \
  products/tax-payroll/frontend/src/main.jsx.before-rc1-h4c
```

## 2. Apply the package

```bash
unzip -o \
  Kenswell_One_Enterprise_1.2_RC1-H4C-Integration.zip

cp -a \
  Kenswell_One_Enterprise_1.2_RC1-H4C-Integration/. \
  /home/kenswelloneenter/kenswell-one-enterprise/
```

## 3. Patch the existing Provider Centre

```bash
python3 \
  products/tax-payroll/frontend/tools/apply-rc1-h4c-integration.py
```

Expected:

```text
RC1-H4C integration patch applied
```

The script replaces only the Staffology workspace component reference.
It does not overwrite the current Provider Centre implementation.

## 4. Verify

```bash
node \
  products/tax-payroll/frontend/review/1.2/RC1/H4C/verify-provider-centre-integration.mjs
```

## 5. Build

```bash
cd products/tax-payroll/frontend
npm run build
```

## 6. Deploy through the existing frontend deployment

Do not use `127.0.0.1` from your desktop. Build and deploy the Vite
`dist` directory through the existing website deployment path.

The production build should use:

```text
VITE_API_BASE_URL=https://api.kenswelloneenterprise.com
```

## 7. Browser result

The existing Staffology employer cards, linking controls and
`Open client payroll` action remain unchanged.

A new `Enterprise runtime` section appears below the existing
Staffology workspace. It can be expanded to:

1. select any of the five employers;
2. discover employer-scoped employees;
3. display a valid empty state for employers with no employees;
4. open an employee workspace.

## 8. Commit

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise

git add \
  products/tax-payroll/frontend/src/main.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/ProviderCentre.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/IntegratedStaffologyWorkspace.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/EnterpriseRuntimeSidecar.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/RuntimeStatePanel.jsx \
  products/tax-payroll/frontend/src/workspaces/providers/provider-runtime-integration.css \
  products/tax-payroll/frontend/tools/apply-rc1-h4c-integration.py \
  products/tax-payroll/frontend/tools/rollback-rc1-h4c-integration.py \
  products/tax-payroll/frontend/review/1.2/RC1/H4C \
  docs/enterprise/1.2-RC1-H4C-provider-centre-integration.md

git diff --cached --name-status
git diff --cached --stat

git commit -m \
  "feat(frontend): integrate runtime into provider centre"
```

Do not stage the `.before-rc1-h4c` backup files.
