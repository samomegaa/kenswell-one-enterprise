#!/usr/bin/env python3.12
from __future__ import annotations

import argparse
import json
import os
import shutil
import stat
import sys
from datetime import datetime, timezone
from pathlib import Path

FRONTEND = Path("products/tax-payroll/frontend")
MAIN = FRONTEND / "src/main.jsx"
REPORT = Path("review/1.2/WORKSPACE/frontend-hygiene-report.json")
BACKUP_ROOT = Path("tmp/5E-5D-backups")

OBSOLETE_IMPORT = "import './components/workspace/workspace.css';"
REQUIRED_IMPORTS = (
    "import './workspaces/framework/workspace.css';",
    "import './workspaces/client/payroll-employees-navigation.css';",
)
IGNORED_DIRECTORIES = {"node_modules", "dist", ".git"}
TEXT_SUFFIXES = {
    ".js", ".jsx", ".ts", ".tsx", ".css", ".json", ".md",
    ".html", ".svg", ".txt", ".yml", ".yaml",
}
CONFIG_NAMES = {".gitignore", ".oxlintrc.json"}


def repository_root() -> Path:
    current = Path.cwd().resolve()
    while current != current.parent:
        if (current / ".git").exists():
            return current
        current = current.parent
    raise RuntimeError("Run this tool from inside the Kenswell repository.")


def ignored(path: Path, base: Path) -> bool:
    relative = path.relative_to(base)
    return any(part in IGNORED_DIRECTORIES for part in relative.parts)


def owned_paths(frontend: Path):
    for path in frontend.rglob("*"):
        if not ignored(path, frontend):
            yield path


def repair_artifact(path: Path) -> bool:
    name = path.name
    return (
        name.endswith(".before-repair")
        or name.endswith(".broken")
        or name.endswith(".patch.md")
        or ".before-" in name
    )


def collect(root: Path) -> dict:
    frontend = root / FRONTEND
    main = root / MAIN
    artifacts = []
    executable = []

    if frontend.exists():
        for path in owned_paths(frontend):
            if not path.is_file():
                continue
            if repair_artifact(path):
                artifacts.append(str(path.relative_to(root)))
            considered = (
                path.suffix.lower() in TEXT_SUFFIXES
                or path.name in CONFIG_NAMES
            )
            if considered and stat.S_IMODE(path.stat().st_mode) & 0o111:
                executable.append(str(path.relative_to(root)))

    text = main.read_text(encoding="utf-8") if main.exists() else ""

    return {
        "nested_products_exists": (frontend / "products").exists(),
        "obsolete_import_present": OBSOLETE_IMPORT in text,
        "repair_artifacts": sorted(artifacts),
        "executable_owned_text_files": sorted(executable),
        "ignored_directories": sorted(IGNORED_DIRECTORIES),
    }


def update_main(main: Path) -> bool:
    original = main.read_text(encoding="utf-8")
    lines = original.splitlines()
    lines = [line for line in lines if line.strip() != OBSOLETE_IMPORT]

    insertion = max(
        [index + 1 for index, line in enumerate(lines) if line.startswith("import ")],
        default=0,
    )

    for required in REQUIRED_IMPORTS:
        if required not in lines:
            lines.insert(insertion, required)
            insertion += 1

    updated = "\n".join(lines).rstrip() + "\n"
    changed = updated != original

    if changed:
        main.write_text(updated, encoding="utf-8")

    return changed


def normalise(frontend: Path) -> list[str]:
    changed = []
    for path in owned_paths(frontend):
        if path.is_dir():
            if stat.S_IMODE(path.stat().st_mode) != 0o755:
                path.chmod(0o755)
                changed.append(str(path))
            continue

        considered = (
            path.suffix.lower() in TEXT_SUFFIXES
            or path.name in CONFIG_NAMES
        )
        if considered and stat.S_IMODE(path.stat().st_mode) != 0o644:
            path.chmod(0o644)
            changed.append(str(path))

    return changed


def apply(root: Path) -> dict:
    frontend = root / FRONTEND
    state = collect(root)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup = root / BACKUP_ROOT / stamp
    backup.mkdir(parents=True, exist_ok=True)

    shutil.copy2(root / MAIN, backup / "main.jsx")

    nested = frontend / "products"
    if nested.exists():
        shutil.copytree(nested, backup / "nested-products")
        shutil.rmtree(nested)

    removed = []
    for item in state["repair_artifacts"]:
        source = root / item
        destination = backup / item
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        source.unlink()
        removed.append(item)

    return {
        "backup_dir": str(backup.relative_to(root)),
        "main_updated": update_main(root / MAIN),
        "removed": removed,
        "permissions_normalised": [
            str(Path(item).relative_to(root))
            for item in normalise(frontend)
        ],
        "ignored_directories": sorted(IGNORED_DIRECTORIES),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    try:
        root = repository_root()
        os.chdir(root)
        before = collect(root)
        changes = {} if args.check else apply(root)
        after = collect(root)

        REPORT.parent.mkdir(parents=True, exist_ok=True)
        REPORT.write_text(
            json.dumps({
                "release": "1.2-5E-5D-revision-1",
                "mode": "check" if args.check else "apply",
                "generatedAt": datetime.now(timezone.utc).isoformat(),
                "before": before,
                "after": after,
                "changes": changes,
            }, indent=2) + "\n",
            encoding="utf-8",
        )

        print("Release 1.2 — 5E-5D Revision 1")
        print("Enterprise Frontend Consolidation & Repository Hygiene")
        print()
        print("Ignored directories: " + ", ".join(sorted(IGNORED_DIRECTORIES)))
        print("Nested products directory:", after["nested_products_exists"])
        print("Obsolete CSS import:", after["obsolete_import_present"])
        print("Repair artefacts:", len(after["repair_artifacts"]))
        print(
            "Executable owned text files:",
            len(after["executable_owned_text_files"]),
        )
        print("Report:", REPORT)
        return 0
    except Exception as error:
        print("5E-5D Revision 1 failed:", error, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
