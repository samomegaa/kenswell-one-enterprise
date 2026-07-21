'use strict';
const fs=require('fs'); const path=require('path'); const assert=require('assert');
const root=path.resolve(__dirname,'../../../../');
const base=path.join(root,'products/tax-payroll/frontend/src/workspaces/staffology/bank-account');
['bankAccountFields.js','bankAccountResolver.js','adaptStaffologyBankAccounts.js','bankAccountPresentation.js','bankAccountPresentationModel.js','BankAccountCard.jsx','BankAccountSection.jsx','StaffologyBankAccountPanel.jsx','bank-account.css','index.js'].forEach((file)=>assert.ok(fs.existsSync(path.join(base,file)),`Missing Bank Account file: ${file}`));
const p=fs.readFileSync(path.join(base,'bankAccountPresentation.js'),'utf8');
assert.ok(p.includes('maskAccountNumber')); assert.ok(p.includes('maskSortCode'));
console.log('Staffology Bank Account Workspace verification passed');
