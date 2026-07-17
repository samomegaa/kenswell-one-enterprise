from pathlib import Path
import json

package_path = Path("package.json")

if not package_path.exists():
    raise SystemExit("package.json not found")

package = json.loads(
    package_path.read_text(
        encoding="utf-8"
    )
)

scripts = package.setdefault(
    "scripts",
    {}
)

scripts[
    "enterprise:1.2:employee-workspace"
] = (
    "node review/1.2/WORKSPACE/"
    "verify-employee-workspace.js"
)

package_path.write_text(
    json.dumps(
        package,
        indent=2,
    ) + "\n",
    encoding="utf-8",
)

print(
    "Enterprise Employee Workspace script applied"
)
