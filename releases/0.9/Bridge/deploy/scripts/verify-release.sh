#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-releases/0.9/Bridge/deploy/env/bridge.production.env.example}"
BASE_URL="${2:-http://localhost:3000}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/validate-env.sh" "$ENV_FILE"

npm run bridge:rc2:docker
npm run bridge:rc2:api-contract
npm run bridge:rc2:http
npm run bridge:rc2:http-security
npm run bridge:rc2:errors
npm run bridge:rc1:smoke-full

echo "Release verification passed"

if [ "${RUN_HEALTH_CHECKS:-false}" = "true" ]; then
  "$SCRIPT_DIR/health-check.sh" "$BASE_URL"
fi
