#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-releases/0.9/Bridge/deploy/env/bridge.production.env.example}"
VERSION="${2:-0.9-RC2}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARTIFACT_DIR="releases/0.9/Bridge/deploy/artifacts"

"$SCRIPT_DIR/validate-env.sh" "$ENV_FILE"
"$SCRIPT_DIR/backup-release.sh" "releases/0.9/Bridge"
"$SCRIPT_DIR/package-release.sh" "$VERSION" "$ARTIFACT_DIR"

echo "Deployment package prepared for version: $VERSION"
echo "Next: deploy artifact from $ARTIFACT_DIR to the target runtime"
