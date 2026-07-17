from pathlib import Path
import json
p=Path('package.json')
if not p.exists(): raise SystemExit('package.json not found')
package=json.loads(p.read_text())
package.setdefault('scripts',{})['enterprise:1.2:employees']='node review/1.2/EMPLOYEES/verify-employee-domain.js'
p.write_text(json.dumps(package,indent=2)+'\n')
print('Enterprise Employee Domain script applied')
