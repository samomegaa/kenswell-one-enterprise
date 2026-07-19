from pathlib import Path

frontend = Path(__file__).resolve().parents[1]
main_path = frontend / "src" / "main.jsx"

css_import = (
    "import './workspaces/employees/"
    "runtime-employee-workspace.css';"
)

text = main_path.read_text()

if css_import in text:
    print("RC2-A workspace CSS already imported")
    raise SystemExit(0)

lines = text.splitlines()
indexes = [
    index
    for index, line in enumerate(lines)
    if line.startswith("import ")
]

if not indexes:
    raise SystemExit(
        "No import block found in src/main.jsx"
    )

lines.insert(max(indexes) + 1, css_import)
main_path.write_text("\n".join(lines) + "\n")

print("RC2-A workspace experience applied")
