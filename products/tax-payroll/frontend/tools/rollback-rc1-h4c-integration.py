from pathlib import Path

frontend = Path(__file__).resolve().parents[1]
provider_path = (
    frontend
    / "src"
    / "workspaces"
    / "providers"
    / "ProviderCentre.jsx"
)

provider = provider_path.read_text()

provider = provider.replace(
    "import IntegratedStaffologyWorkspace "
    "from './IntegratedStaffologyWorkspace';",
    "import StaffologyProviderWorkspace "
    "from './StaffologyProviderWorkspace';",
)

provider = provider.replace(
    "<IntegratedStaffologyWorkspace",
    "<StaffologyProviderWorkspace",
)

provider_path.write_text(provider)
print("Provider Centre integration rolled back")
