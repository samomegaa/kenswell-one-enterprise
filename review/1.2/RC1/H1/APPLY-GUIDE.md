# RC1-H1 Apply Guide

Run from the repository root:

```bash
cd /home/kenswelloneenter/kenswell-one-enterprise
```

## 1. Extract and copy

```bash
unzip -o Kenswell_One_Enterprise_1.2_RC1-H1.zip
cp -a Kenswell_One_Enterprise_1.2_RC1-H1/. /home/kenswelloneenter/kenswell-one-enterprise/
```

## 2. Syntax checks

```bash
node --check src/enterprise/employers/employer-discovery-service.js
node --check apps/api/src/routes/employer-routes.js
node --check review/1.2/RC1/H1/verify-employer-runtime.js
```

## 3. Isolated verification

```bash
node review/1.2/RC1/H1/verify-employer-runtime.js
```

Expected:

```text
PASS  Employer discovery
PASS  Employer discovery cache
PASS  Employer-scoped employees
PASS  Employer workspace context

✅ RC1-H1 Employer Runtime passed
```

## 4. Live employer discovery

This reads Staffology dynamically and does not save employer or employee identifiers to `.env.local`.

```bash
node review/1.2/RC1/H1/discover-live-employers.js
```

## 5. Integration hold point

Do not replace the H0 composition yet. First run live discovery and confirm the actual Staffology employer response shape. If discovery passes, the next integration step will mount the H1 employer routes and replace the fixed-employer H0 composition.

## 6. Commit

```bash
git add src/enterprise/employers apps/api/src/services apps/api/src/routes/employer-routes.js apps/api/src/composition/employer-runtime-composition.js review/1.2/RC1/H1 docs/enterprise/1.2-RC1-H1-employer-runtime.md
git commit -m "feat(api): add enterprise employer discovery runtime"
```
