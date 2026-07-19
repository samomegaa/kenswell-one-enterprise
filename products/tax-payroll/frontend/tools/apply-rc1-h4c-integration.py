from pathlib import Path

frontend = Path(__file__).resolve().parents[1]
provider_path = (
    frontend
    / "src"
    / "workspaces"
    / "providers"
    / "ProviderCentre.jsx"
)
main_path = frontend / "src" / "main.jsx"

provider = provider_path.read_text()

old_import = (
    "import StaffologyProviderWorkspace "
    "from './StaffologyProviderWorkspace';"
)
new_import = (
    "import IntegratedStaffologyWorkspace "
    "from './IntegratedStaffologyWorkspace';"
)

if new_import not in provider:
    if old_import not in provider:
        raise SystemExit(
            "Expected StaffologyProviderWorkspace import "
            "was not found in ProviderCentre.jsx"
        )

    provider = provider.replace(
        old_import,
        new_import,
        1,
    )

provider = provider.replace(
    "<StaffologyProviderWorkspace",
    "<IntegratedStaffologyWorkspace",
)

provider_path.write_text(provider)

css_imports = [
    (
        "import './workspaces/providers/"
        "employer-runtime.css';"
    ),
    (
        "import './workspaces/employees/"
        "employee-runtime.css';"
    ),
    (
        "import './workspaces/providers/"
        "provider-runtime-integration.css';"
    ),
]

main = main_path.read_text()
missing = [item for item in css_imports if item not in main]

if missing:
    lines = main.splitlines()
    import_indexes = [
        index
        for index, line in enumerate(lines)
        if line.startswith("import ")
    ]

    if not import_indexes:
        raise SystemExit(
            "No import block found in src/main.jsx"
        )

    insertion = max(import_indexes) + 1

    for offset, item in enumerate(missing):
        lines.insert(insertion + offset, item)

    main_path.write_text("\n".join(lines) + "\n")

print("RC1-H4C integration patch applied")
