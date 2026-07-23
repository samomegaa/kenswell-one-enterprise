'use strict';
const fs=require('fs'); const path=require('path'); const {execFileSync}=require('child_process');
const capabilities=require('./r0-capabilities');
const root=path.resolve(process.argv[2]||process.cwd());
const git=(args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
const status=git(['status','--short']).split('\n').filter(Boolean).filter(line=>
 !line.includes('review/2.0/R0')&&!line.includes('tools/version-2.0'));
const inventory=capabilities.map(([name,p])=>({name,path:p,present:fs.existsSync(path.join(root,p))}));
const snapshot={release:'2.0-R0',capturedAt:new Date().toISOString(),branch:git(['branch','--show-current']),
 commit:git(['rev-parse','HEAD']),node:process.version,preExistingWorkingTreeEntries:status.length,
 capabilityCount:inventory.length,capabilitiesPresent:inventory.filter(x=>x.present).length,capabilities:inventory};
const out=path.join(root,'review/2.0/R0/baseline-snapshot.json');
fs.writeFileSync(out,JSON.stringify(snapshot,null,2)+'\n');
console.log('R0 baseline captured: '+out); console.log('Commit: '+snapshot.commit);
console.log(`Capabilities: ${snapshot.capabilitiesPresent}/${snapshot.capabilityCount}`);
console.log('Pre-existing working-tree entries: '+snapshot.preExistingWorkingTreeEntries);
